"use client";
import { getDownloadURL } from "firebase/storage";
import { getStorageRef } from "./firebaseCRUD";

export const downloadPDf = async (storage: string) => {
  try {
    const url = await getDownloadURL(getStorageRef(storage));
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);

      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = storage;
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
