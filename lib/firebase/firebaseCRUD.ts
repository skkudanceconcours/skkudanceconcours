import { db } from "../firebase/firebaseConfig";
// type
import { NoticeType } from "@/template/notice";
// firebase
import {
  orderBy,
  query,
  collection,
  getDocs,
  limit,
  addDoc,
  Timestamp,
} from "firebase/firestore";

//Create
//임 시
export const setNotices = async (notice: NoticeType) => {
  const res = await addDoc(collection(db, "notices"), {
    notice,
  });
};
const PAGE_NOTICE_SIZE = 5;

function sortNotices(data: NoticeType[]): NoticeType[] {
  return data.sort((a, b) => {
    if (a.important && !b.important) {
      return -1;
    }
    if (!a.important && b.important) {
      return 1;
    }

    return b.timestamp.toMillis() - a.timestamp.toMillis();
  });
}

//Read All
export const ReadAllData = async (collectionName: string) => {
  try {
    const res = await getDocs(collection(db, collectionName));
    if (res.size) {
      const allDocs: NoticeType[] = [];
      res.forEach((doc) => {
        allDocs.push({
          ...(doc.data().notice as NoticeType),
          id: doc.id,
        });
      });
      const sorted_arr = sortNotices(allDocs);
      return sorted_arr;
    } else {
      throw new Error("Could not fetch document");
    }
  } catch (error) {
    console.log(error);

    console.log(`error Occured on firebaseCRUD: ${error}`);
  }
};

// Update

// Delete

// 예씨 데이터 넣기
