"use client";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
// Quill Related
import ReactQuill from "react-quill";
// Icons & Images
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ImCloudUpload } from "react-icons/im";
import { styled } from "@mui/material/styles";

// Type
import { NoticeFileType, NoticeType } from "@/template/notice";
// firebase
import { getStorageRef, uploadNoticeFile } from "@/lib/firebase/firebaseCRUD";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { downloadPDf } from "@/lib/firebase/downloadFile";

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
  files: [],
};

export const QuillEditor = (): ReactNode => {
  const [noticeInput, setNoticeInput] = useState<NoticeType>(initNotice);
  const [contents, setContents] = useState<string>("");
  const [files, setFiles] = useState<NoticeFileType[]>([]); // 파일 url들을 저장
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);

  // Functions
  function handleTitle(value: string) {
    setNoticeInput((prev) => ({
      ...prev,
      title: value as string,
    }));
  }
  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files;

    if (!uploadedFile) return;
    const filesArray: File[] = Array.from(uploadedFile);
    // firebase 올리기
    setIsSaving(true);
    const uniqueId: string | null = await uploadNoticeFile(filesArray[0]);

    const fileObj: NoticeFileType = {
      name: filesArray[0].name,
      uuid: uniqueId as string,
    };
    setFiles((prevFilesObj) => [...prevFilesObj, fileObj]);
    setNoticeInput((prev) => ({
      ...prev,
      files: [...prev.files, fileObj],
    }));
    setIsSaving(false);
  };

  useEffect(() => {
    console.log(noticeInput);
  }, [noticeInput]);

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

  //File Settings
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
        ) => handleTitle(e.currentTarget.value as string)}
      />
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<ImCloudUpload />}
      >
        파일 업로드
        <VisuallyHiddenInput type="file" multiple onChange={handleFiles} />
      </Button>
      {isSaving ? (
        <p className="h-3 w-full ">Saving...</p>
      ) : (
        files.map((file, index) => (
          <div
            className="flex h-[10%] w-full items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap hover:cursor-pointer hover:text-blue-400"
            key={index}
            onClick={() => downloadPDf(`공지사항/${file.uuid}`, file.name)}
          >
            {file.name}
          </div>
        ))
      )}

      {typeof window !== "undefined" ? (
        <EditorWrapper
          style={{ width: "100%", height: "100%", marginTop: "1rem" }}
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
