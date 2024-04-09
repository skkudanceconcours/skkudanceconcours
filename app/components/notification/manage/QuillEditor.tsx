"use client";
import React, {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
// import { ImageResize } from "quill-image-resize-module-ts";
// Quill.register("modules/ImageResize", ImageResize);
// Icons & Images
import { Box, InputLabel, TextField } from "@mui/material";
// Type
import { NoticeType } from "@/template/notice";
// firebase
import { getStorageRef } from "@/lib/firebase/firebaseCRUD";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
// 고유 식별자 생성
import { v4 as uuidv4 } from "uuid";
// components
import SubmitBtn from "./SubmitBtn";

const initNotice: NoticeType = {
  contents: "",
  timeStamp: new Date(),
  important: false,
  title: "",
  viewCount: 0,
};

export const QuillEditor = (): ReactNode => {
  const [noticeInput, setNoticeInput] = useState<NoticeType>(initNotice);
  const [contents, setContents] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  // Functions
  function handleInput(value: string) {
    setNoticeInput((prev) => ({
      ...prev,
      title: value as string,
    }));
  }

  // Image base64 to url
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      if (!quillRef.current) return;

      const editor = quillRef.current.getEditor();
      const file = input.files?.[0] as File;
      const range = editor.getSelection(true);

      try {
        const uniqueId = uuidv4(); // UUID 생성
        const storageRef = getStorageRef(`이미지/${uniqueId}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        editor.insertEmbed(range?.index, "image", url);
        // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
        editor.setSelection(range.index + 1, range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    console.log(contents);
  }, [contents]);
  // Editor Setting
  const formats = [
    "size",
    "h1",
    "h2",
    "h3",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "link",
    "blockquote",
    "font",
    "header",
    "bullet",
    "indent",
    "image",
  ];
  // Editor Settings
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote"],
          [{ align: [] }, "link", "image"],
        ],
        handlers: { image: imageHandler },
        // ImageResize: {
        //   parchment: Quill.import("parchment"),
        //   modules: ["Resize", "DisplaySize"],
        // },
      },
    };
  }, []);

  return (
    <Box
      component="form"
      autoComplete="on"
      position="relative"
      display="flex"
      width="80%"
      height="60%"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {/* <div>
        <label htmlFor="file">
          v
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )} */}
      <TextField
        required
        id="outlined-required"
        label="제목"
        margin="dense"
        fullWidth
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleInput(e.currentTarget.value as string)}
      />
      <ReactQuill
        style={{ width: "100%", height: "100%" }}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setContents}
        ref={quillRef}
      />
      <SubmitBtn noticeInput={noticeInput} contents={contents} />
    </Box>
  );
};
