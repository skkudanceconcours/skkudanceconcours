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

export type NoticeViewType = {
  contents: string;
  timestamp: Date;
  title: string;
  viewCount: number;
};
