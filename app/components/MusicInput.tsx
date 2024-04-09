import { ForwardedRef, ReactNode, forwardRef } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ImCloudUpload } from "react-icons/im";
import { SiApplemusic } from "react-icons/si";
type MusicInputProps = {
  className?: string;
  onChange: (file: File) => void;
  fileName: string | null;
  error: boolean;
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

const MusicInput = forwardRef<HTMLDivElement, MusicInputProps>(
  (
    { className, onChange, fileName, error }: MusicInputProps,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactNode => {
    return (
      <div className={`${className} w-fit my-8`} ref={ref}>
        <p className="text-[0.75rem] my-2 opacity-70">음원 제출</p>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          style={{ borderColor: error ? 'red' : '#1976D2', color: error ? 'red' : '#1976D2',}}
          startIcon={<ImCloudUpload />}
        >
          파일 업로드
          <VisuallyHiddenInput
            type="file"
            accept="audio/mp3"
            onChange={(e) => onChange(e.currentTarget.files![0])}
          />
        </Button>
        {fileName && <div className="flex p-2 items-endr">
          <SiApplemusic className="w-4 h-4 mr-2"/>
          <p className="text-sm h-full">{fileName}</p>
        </div>}
      </div>
    );
  }
);

MusicInput.displayName = "MusicInput";

export default MusicInput;
