import { create } from "zustand";
import { NoticeViewType } from "@/template/notice";
import { createJSONStorage, persist } from "zustand/middleware";
interface NoticeState extends NoticeViewType {
  setNoticeState: (notice: NoticeViewType) => void;
}

export const initStore = {
  contents: "",
  timeStamp: new Date(),
  title: "",
  viewCount: 0,
  files: [],
  id: "",
};

const useNoticeStore = create<NoticeState>()(
  persist(
    (set) => ({
      contents: "",
      timeStamp: new Date(),
      title: "",
      viewCount: 0,
      files: [],
      id: "",
      setNoticeState: (notice: NoticeViewType) =>
        set({
          contents: notice.contents,
          timeStamp: notice.timeStamp,
          title: notice.title,
          viewCount: notice.viewCount,
          files: notice.files,
          id: notice.id,
        }),
    }),
    {
      name: "notice-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useNoticeStore;
