import { ReactNode } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ImCloudUpload } from "react-icons/im";
type MusicInputProps = {
  className?: string
  onChange: React.Dispatch<React.SetStateAction<File|null>>
};
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

const MusicInput = ({ className, onChange }: MusicInputProps): ReactNode => {
  return (
    <div className={`${className} w-fit my-8`}>
        <p className="text-[0.75rem] my-2 opacity-70">음원 제출</p>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<ImCloudUpload/>}>
        파일 업로드
        <VisuallyHiddenInput 
          type="file" 
          accept=".mp3"
          onChange={(e) =>  onChange(e.currentTarget.files![0])}/>
      </Button>
    </div>
  );
};

export default MusicInput;


