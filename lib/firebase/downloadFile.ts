"use client";
import { getDownloadURL } from "firebase/storage";
import { getStorageRef } from "./firebaseCRUD";

export const downloadPDf = async (
  storage: string,
  fileName: string,
): Promise<undefined> => {
  try {
    const url: string = await getDownloadURL(getStorageRef(storage));
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);

      const a: HTMLAnchorElement = document.createElement("a");
      const url: string = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };
    xhr.open("GET", url);
    xhr.send();
  } catch (error) {
    console.log(error);
  }
};
