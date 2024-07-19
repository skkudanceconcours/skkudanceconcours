'use client';
import React, { ReactNode } from 'react';
// type
import { NoticeFileType } from '@/template/notice';
// Icons
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
// firebase
import { downloadPDf } from '@/lib/firebase/downloadFile';

interface FilePreviewProps {
  files: NoticeFileType[];
}

const FilePreview = ({ files }: FilePreviewProps): ReactNode => {
  const fileDisplay = files.map(file => (
    <div
      key={file.uuid}
      className='flex h-fit w-full items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap py-2 hover:cursor-pointer hover:text-blue-400'
      onClick={() => downloadPDf(`공지사항/${file.uuid}`, file.name)}
    >
      <UploadFileOutlinedIcon />
      {file.name}
    </div>
  ));
  return <>{fileDisplay}</>;
};

export default FilePreview;
