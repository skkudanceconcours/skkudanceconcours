"use client"
import React, {
    RefObject,
    useMemo,
    useState,
  } from 'react';
  import ReactQuill, { Quill } from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  
  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
  ];
  
  export const QuillEditor = () => {
    
   const [values, setValues] = useState<string>();
    
   const modules = useMemo(() => {
      return {
        toolbar: {
          container: [
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [
              {
                color: [],
              },
              { background: [] },
            ],
          ],
        },
      };
    }, []);
  
      return(
       <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setValues}
      />
      )
  }