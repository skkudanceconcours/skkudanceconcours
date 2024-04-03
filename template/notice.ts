import { Timestamp } from "firebase/firestore";

export type NoticeType = {
  id?: string;
  num?: number;
  contents: string;
  timestamp: Timestamp;
  title: string;
  viewCount: number;
  important: boolean;
};
