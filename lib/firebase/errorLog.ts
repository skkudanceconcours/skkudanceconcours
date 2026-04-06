import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

type ErrorLogType = "validation_error" | "submit_failed" | "upload_failed";

type ErrorLogParams = {
  type: ErrorLogType;
  message: string;
  userName?: string;
  major?: string;
};

export const logError = async (params: ErrorLogParams) => {
  try {
    await addDoc(collection(db, "error_logs"), {
      ...params,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
  } catch (e) {
    console.error("에러 로그 저장 실패", e);
  }
};
