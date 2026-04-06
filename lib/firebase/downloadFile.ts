"use client";
import { getDownloadURL } from "firebase/storage";
import { getStorageRef } from "./firebaseCRUD";

export const downloadPDf = async (
  storage: string,
  fileName: string,
): Promise<void> => {
  const url: string = await getDownloadURL(getStorageRef(storage));
  return new Promise((resolve, reject) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      const blob = xhr.response;

      const a: HTMLAnchorElement = document.createElement("a");
      const blobUrl: string = window.URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
      resolve();
    };
    xhr.onerror = () => reject(new Error("다운로드 실패"));
    xhr.open("GET", url);
    xhr.send();
  });
};
