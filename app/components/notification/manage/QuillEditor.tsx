"use client";
import React, { ReactNode, useMemo, useRef, useState } from "react";
// Quill Related
import ReactQuill from "react-quill";
// Icons & Images
import { Box, TextField } from "@mui/material";
// Type
import { NoticeType } from "@/template/notice";
// firebase
import { getStorageRef } from "@/lib/firebase/firebaseCRUD";
import { uploadBytes, getDownloadURL } from "firebase/storage";
// 고유 식별자 생성
import { v4 as uuidv4 } from "uuid";
// components
import SubmitBtn from "./SubmitBtn";
import EditorWrapper from "./EditorWrapper";

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
    "float",
    "height",
    "width",
  ];
  // Editor Settings
  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
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
        ImageResize: {
          modules: ["Resize"],
        },
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
      {typeof window !== "undefined" ? (
        <EditorWrapper
          style={{ width: "100%", height: "100%" }}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setContents}
          forwardedRef={quillRef}
        />
      ) : null}

      <SubmitBtn noticeInput={noticeInput} contents={contents} />
    </Box>
  );
};
