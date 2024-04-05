import { create } from "zustand";
import { NoticeViewType } from "@/template/notice";

interface NoticeState extends NoticeViewType {
    contents: string
    timeStamp: Date
    title: string
    viewCount: number
    setNoticeState: (notice:NoticeViewType) => void;
}

const useNoticeStore = create<NoticeState>((set) => ({
    contents: "",
    timeStamp: new Date(),
    title: "",
    viewCount: 0,
   
    setNoticeState : (notice: NoticeViewType) => 
        set({contents: notice.contents,
            timeStamp: notice.timeStamp,
            title: notice.title,
            viewCount:notice.viewCount})
    
  }));
  
  export default useNoticeStore;