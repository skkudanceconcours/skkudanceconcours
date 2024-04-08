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
import { Button } from "@nextui-org/react";
// Type
import { NoticeType } from "@/template/notice";
// firebase
import { setNotices, getStorageRef } from "@/lib/firebase/firebaseCRUD";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
// 고유 식별자 생성
import { v4 as uuidv4 } from "uuid";

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

  // State Handling
  function handleInput(input: string, value: string | boolean) {
    // 제목
    if (input === "title") {
      setNoticeInput((prev) => ({
        ...prev,
        title: value as string,
      }));
    }
    // 중요 공지임
    if (input === "important") {
      setNoticeInput((prev) => ({
        ...prev,
        important: true,
      }));
    }
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

  // Submit
  const submitHandler = async (): Promise<undefined> => {
    try {
      const data: NoticeType = {
        ...noticeInput,
        contents: contents,
        timeStamp: new Date(),
      };
      setNotices(data);
    } catch (error) {
      console.log("Error Occured on Submitting!", error);
    }
  };

  // useEffect(() => {
  //   console.log(noticeInput);
  // }, [noticeInput]);
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
        ) => handleInput("title", e.currentTarget.value)}
      />
      <ReactQuill
        style={{ width: "100%", height: "100%" }}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setContents}
        ref={quillRef}
      />
      <Button
        color="primary"
        variant="solid"
        className="fixed bottom-4 right-4"
        onClick={submitHandler}
      >
        Submit
      </Button>
    </Box>
  );
};
