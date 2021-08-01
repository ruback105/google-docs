import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { convertFromRaw, convertToRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

export type TextEditorProps = {
  id: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ id }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [session] = useSession();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection("userDocs")
      .doc(session?.user.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        {
          merge: true,
        }
      );
  };

  return (
    <div className="bg-[#F8F9FA] mb-16 min-h-screen">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-40 !justify-center mx-auto"
        wrapperClassName="wrapperClassName"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12  border p-10"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
