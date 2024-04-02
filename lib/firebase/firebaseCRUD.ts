import { db } from "../firebase/firebaseConfig";
// type
import { NoticeType } from "@/template/notice";
// firebase
import { collection, getDocs, addDoc } from "firebase/firestore";

//Create
//임 시
export const setNotices = async (notice: NoticeType) => {
  const res = await addDoc(collection(db, "notices"), {
    notice,
  });
};

//Read
export const ReadAllData = async (collectionName: string) => {
  try {
    const res = await getDocs(collection(db, collectionName));
    if (res.size) {
      // get the data out if res is not empty
      const allDocs: NoticeType[] = [];
      res.forEach((doc) => {
        allDocs.push({
          ...(doc.data().notice as NoticeType),
          id: doc.id,
        });
      });
      return allDocs;
    } else {
      throw new Error("Could not fetch document");
    }
  } catch (error) {
    console.log(`error Occured on firebaseCRUD: ${error}`);
  }
};

//Update

//Delete

// 예씨 데이터 넣기
