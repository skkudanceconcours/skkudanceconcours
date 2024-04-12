export interface NoticeFileType {
  name: string;
  uuid: string;
}
export interface NoticeViewType {
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
  files: NoticeFileType[];
  id: string;
}
export interface NoticeType extends NoticeViewType {
  num?: number;
  important: boolean;
}
