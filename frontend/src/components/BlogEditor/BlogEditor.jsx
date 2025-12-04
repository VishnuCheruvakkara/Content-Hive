import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function BlogEditor({ onSubmit }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const uploadImageCallback = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch("http://localhost:8000/api/upload-image/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          resolve({ data: { link: data.image_url } });
        })
        .catch((err) => reject(err));
    });
  };

  const handleSave = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onSubmit(html);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "image",
            "history",
          ],
          inline: { inDropdown: false },
          image: {
            uploadCallback: uploadImageCallback,
            previewImage: true,
            alt: { present: true },
          },
        }}
      />

      <button
        onClick={handleSave}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Post
      </button>
    </div>
  );
}

export default BlogEditor;
