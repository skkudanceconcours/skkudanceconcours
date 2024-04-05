export type NoticeType = {
  id?: string;
  num?: number;
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
  important: boolean;
};

export type NoticeViewType = {
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
};
