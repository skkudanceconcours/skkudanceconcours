import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Type
import { NoticeType } from "@/template/notice";
import { Path } from "@/template/paths";

// firebase
import { setNotices } from "@/lib/firebase/firebaseCRUD";
// Images & Icons
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface SubmitBtnProps {
  noticeInput: NoticeType;
  contents: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "1rem",
};

const SubmitBtn = ({ noticeInput, contents }: SubmitBtnProps) => {
  const router = useRouter();
  // useState
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Submit
  const submitHandler = async (isImp: boolean): Promise<undefined> => {
    try {
      const data: NoticeType = {
        ...noticeInput,
        contents: contents,
        timeStamp: new Date(),
        important: isImp,
      };
      setNotices(data);

      const nextPath: Path = "/notification";
      router.push(nextPath);
    } catch (error) {
      console.log("Error Occured on Submitting!", error);
    }
  };
  return (
    <>
      <Button
        color="primary"
        variant="solid"
        className="fixed bottom-4 right-4"
        onClick={handleOpen}
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            중요 공지로 등록할까요?
          </Typography>
          <div className="flex w-full items-center justify-evenly">
            <Button
              color="primary"
              variant="bordered"
              onClick={() => submitHandler(true)}
            >
              Yes
            </Button>
            <Button
              color="danger"
              variant="bordered"
              onClick={() => submitHandler(true)}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SubmitBtn;
