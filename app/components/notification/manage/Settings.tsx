"use client";
import React, { ReactNode, useState, useRef } from "react";
import { useRouter } from "next/navigation";
// mui Frames
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
// Types
import { Path } from "@/template/paths";
// hooks
import { useDetectClose } from "@/lib/hooks/useDetectClose";
interface ModalProps {
  modalHandler: (val: boolean) => void;
}

const Modal = ({ modalHandler }: ModalProps): ReactNode => {
  // Declare
  const router = useRouter();
  const path: Path = "/notification/add_notice";
  const boxRef = useRef<HTMLElement>(null);
  //   const [isOpen, outsideClick] = useDetectClose(boxRef, false);

  return (
    <Box
      position="fixed"
      right={70}
      bottom={70}
      bgcolor="background.paper"
      sx={{
        border: "0.2px solid #e8e8e8",
        borderRadius: "1rem",
        borderBottomRightRadius: "0",
      }}
    >
      <nav aria-label="main mailbox folders" onBlur={() => modalHandler(false)}>
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push(path)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Modify" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

const AddNotice = (): ReactNode => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  function modalHandler(val: boolean) {
    setOpenModal(val);
  }
  return (
    <React.Fragment>
      <Fab
        aria-label="settings"
        size="medium"
        sx={{
          position: "fixed",
          right: 30,
          bottom: 30,
        }}
        onClick={() => setOpenModal(!openModal)}
      >
        <SettingsIcon />
      </Fab>
      {openModal && <Modal modalHandler={modalHandler} />}
    </React.Fragment>
  );
};

export default AddNotice;
