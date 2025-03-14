import { Reception } from '@/template/reception';
import { db } from '../firebase/firebaseConfig';
import { revalidateTag } from 'next/cache';
// type
import { NoticeType } from '@/template/notice';
import { v4 as uuidv4 } from 'uuid';

// firebase
import { collection, getDocs, addDoc, updateDoc, doc, increment, deleteDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import delayTimeout from '../functions/asyncTimeout';
import { FirebaseError } from 'firebase/app';



const storage = getStorage();
const getCollection = (collectionName: Collection) => collection(db, collectionName);
export const getStorageRef = (refName: string) => ref(storage, refName);

//Create
export const setNotices = async (notice: NoticeType) => {
  const { id, ...data } = notice;
  try {
    const res = await getDocs(getCollection('notices'));
    const exists: boolean = res.docs.some((doc) => doc.id === id);
    // 수정
    if (exists) {
      const modify_doc = await updateDoc(doc(db, 'notices', id), {
        notice: data,
      });
    }
    // 생성
    else {
      const new_doc = await addDoc(getCollection('notices'), {
        notice: data,
      });
    }
    // revalidateTag("notice");
  } catch (error) {
    console.log(error);
  }
};

export const uploadMP3File = async (fileName: string, file: File | null): Promise<string | null> => {
  if (!file) return null;
  const fileRef = getStorageRef(fileName);
  const metadata = {
    contentType: 'audio/mpeg',
  };
  let fileURL: string;
  try {
    await uploadBytes(fileRef, file, metadata);
    fileURL = await getDownloadURL(fileRef);
    return fileURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadStorageFile = async (file: File | null, folder: string): Promise<string | null> => {
  if (!file) return null;
  let storageRef = getStorageRef(``);
  try {
    if (folder === '공지사항') {
      const uniqueId = uuidv4(); // UUID 생성
      storageRef = getStorageRef(`${folder}/${uniqueId}`);
      const snapshot = await uploadBytes(storageRef, file);
      return uniqueId;
    } else if (folder === '요강') {
      const metadata = {
        contentType: 'application/pdf',
      };

      storageRef = getStorageRef(`${folder}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file, metadata);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const submitReception = async (reception: Reception): Promise<string | null> => {
  try {
    const res = await addDoc(getCollection('reception2025'), { reception });
    return res.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const submitTest = async () => {
  try {
    const res = await addDoc(getCollection('test'), { abc: 123 });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Read

function sortNotices(data: NoticeType[]): NoticeType[] {
  return data.sort((a, b) => {
    if (a.important && !b.important) {
      return -1;
    }
    if (!a.important && b.important) {
      return 1;
    }

    return b.timeStamp.getTime() - a.timeStamp.getTime();
  });
}

export const getAllNotices = async () => {
  try {
    const res = await getDocs(getCollection('notices'));
    const datas: NoticeType[] = res.docs.map((doc) => {
      const { timeStamp } = doc.data().notice;
      return {
        id: doc.id,
        ...doc.data().notice,
        timeStamp: new Date(timeStamp.toDate()),
      };
    });
    const sorted_arr = sortNotices(datas);
    return sorted_arr;
  } catch (error) {
    console.log(`error occured on firebaseCRUD: ${error}`);
    return [];
  }
};

export const getAllReception = async (year: YearOption): Promise<Reception[]> => {
  try {
    const res = await getDocs(getCollection(year == "2024" ? 'reception' : "reception2025"));
    const datas: Reception[] = res.docs.map((doc) => {
      const { timestamp } = doc.data().reception;
      return {
        ...doc.data().reception,
        timestamp: new Date(timestamp.toDate()),
      };
    });
    return datas;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// PDF 받아오기
export const getPDFPath = async (): Promise<string> => {
  try {
    const storageRef = getStorageRef('요강');
    const fileList = await listAll(storageRef);
    return fileList.items[0].fullPath;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const getPDF = async (): Promise<string> => {
  try {
    const filePath = await getPDFPath();
    const storageRef = getStorageRef(filePath);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log('GetPDF', error);
  }
  return 'failed!';
};

// Update
export const updateViewCount = async (id: string) => {
  try {
    await updateDoc(doc(db, 'notices', id), {
      'notice.viewCount': increment(1),
    });
  } catch (error) {
    console.log('Error updating view Count', error);
  }
};

export const updatePDF = async (file: File | null) => {
  try {
    const filePath = await getPDFPath();
    // 파일 업로드
    const upload_res = await uploadStorageFile(file, '요강');
    // 파일 삭제
    const res = await deleteObject(getStorageRef(filePath));
  } catch (error) {
    console.log('Error in pdf upload', error);
  }
};

// Delete
export const deleteNotice = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'notices', id));
    revalidateTag('notice');
    await delayTimeout(4000);
  } catch (error) {
    console.log('Error is deleting notices', error);
  }
};
