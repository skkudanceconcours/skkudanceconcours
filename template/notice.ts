export interface NoticeViewType {
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
};
export interface NoticeType extends NoticeViewType {
  id?: string;
  num?: number;
  important: boolean;
};


