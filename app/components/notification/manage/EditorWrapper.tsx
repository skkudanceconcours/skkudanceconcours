import React from "react";
import dynamic from "next/dynamic";
// Quill
import ReactQuill, { Quill, ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
// Types
interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const EditorWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");

    const { ImageActions } = await import("@xeger/quill-image-actions");
    const { ImageFormats } = await import("@xeger/quill-image-formats");
    QuillComponent.Quill.register("modules/imageActions", ImageActions);
    QuillComponent.Quill.register("modules/imageFormats", ImageFormats);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <div>...Loading Editor</div>, ssr: false },
);

export default EditorWrapper;
