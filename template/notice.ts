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
}
export interface NoticeType extends NoticeViewType {
  id?: string;
  num?: number;
  important: boolean;
}
