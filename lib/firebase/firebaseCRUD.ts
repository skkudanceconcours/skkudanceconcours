import { Reception } from "@/template/Reception";
import { db } from "../firebase/firebaseConfig";
// type
import { NoticeType } from "@/template/notice";
// firebase
import { collection, getDocs, addDoc } from "firebase/firestore";

const getCollection = (collectionName: "notice"|"reception"|"test") => collection(db, collectionName);

//Create
//임 시
export const setNotices = async (notice: NoticeType) => {
  try{
    const res = await addDoc(getCollection('notice'), {
      notice,
    }) }catch(error){
    console.log(error)
  }
};

export const submitReception = async (reception: Reception) =>{
  try{
    const res = await addDoc(getCollection('reception'), {reception} )
    return res
  } catch (error) {
    console.log(error);
  }
}

export const submitTest = async () =>{
  try{
    const res = await addDoc(getCollection('test'), { abc:123 } )
    return res
  } catch (error) {
    console.log(error);
  }
}

//Read
export const getAllNotices = async () => {
  try {
    const res = await getDocs(getCollection('notice'));
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
