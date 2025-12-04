import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TipTapEditor({ onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // send updated HTML to parent
    },
  });

  return (
    <div className="border rounded p-3 min-h-[200px]">
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapEditor;