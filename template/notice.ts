export interface NoticeViewType {
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
  file: File[];
}
export interface NoticeType extends NoticeViewType {
  id?: string;
  num?: number;
  important: boolean;
}
