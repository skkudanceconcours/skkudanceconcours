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
import { getStorageRef, uploadStorageFile } from "@/lib/firebase/firebaseCRUD";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { downloadPDf } from "@/lib/firebase/downloadFile";
// context
import useNoticeStore from "@/lib/zustand/noticeStore";
// 고유 식별자 생성
import { v4 as uuidv4 } from "uuid";
// components
import SubmitBtn from "./SubmitBtn";
import EditorWrapper from "./EditorWrapper";

export const QuillEditor = (): ReactNode => {
  const { contents, timeStamp, title, viewCount, files, id } = useNoticeStore();
  const initNotice: NoticeType = {
    contents,
    timeStamp,
    important: false,
    title,
    viewCount,
    files,
    id,
  };

  const [noticeInput, setNoticeInput] = useState<NoticeType>(initNotice);
  const [contentsInput, setContentsInput] = useState<string>(contents);
  const [filesInput, setFilesInput] = useState<NoticeFileType[]>(files); // 파일 url들을 저장
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
    try {
      const uniqueId: string | null = await uploadStorageFile(
        filesArray[0],
        "공지사항",
      );

      const fileObj: NoticeFileType = {
        name: filesArray[0].name,
        uuid: uniqueId as string,
      };
      setFilesInput((prevFilesObj) => [...prevFilesObj, fileObj]);
      setNoticeInput((prev) => ({
        ...prev,
        files: [...prev.files, fileObj],
      }));
    } catch (error) {
      console.log(error);
    }

    setIsSaving(false);
  };

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
    "header",
    "code-block",
    "bold",
    "size",
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
  ];
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
        label={!noticeInput.title ? "제목" : null}
        margin="dense"
        fullWidth
        value={noticeInput.title}
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
      ) : filesInput ? (
        filesInput.map((file) => (
          <Box
            component="div"
            className="flex w-full items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap py-4 hover:cursor-pointer hover:text-blue-400"
            key={file.uuid}
            onClick={() => downloadPDf(`공지사항/${file.uuid}`, file.name)}
          >
            {file.name}
          </Box>
        ))
      ) : null}

      {typeof window !== "undefined" ? (
        <EditorWrapper
          style={{ width: "100%", height: "100%", marginTop: "1rem" }}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setContentsInput}
          forwardedRef={quillRef}
          defaultValue={contentsInput}
        />
      ) : null}

      <SubmitBtn noticeInput={noticeInput} contents={contentsInput} />
    </Box>
  );
};
