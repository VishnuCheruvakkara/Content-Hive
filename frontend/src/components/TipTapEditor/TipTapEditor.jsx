import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

// CORRECT IMPORTS FOR NEWER VERSIONS
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";

// Create lowlight instance
const lowlight = createLowlight();

// Register the language - Use the correct syntax
lowlight.register("javascript", javascript);

// Optional: Register more languages
// import python from "highlight.js/lib/languages/python";
// import html from "highlight.js/lib/languages/xml";
// import css from "highlight.js/lib/languages/css";
// lowlight.register("python", python);
// lowlight.register("html", html);
// lowlight.register("css", css);

const TipTapEditor = ({ value, onChange }) => {
  const fileInputRef = useRef(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-400 underline",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Upload image function (calls backend)
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/uploads/image/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`);
      }

      const data = await res.json();
      const imageUrl = data.url;

      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
    }

    // Reset file input
    event.target.value = null;
  };

  if (!editor) {
    return <div className="p-4 text-gray-400">Loading editor...</div>;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-700 bg-gray-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm ${editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded text-sm ${editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded text-sm ${editor.isActive("codeBlock") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="px-3 py-1.5 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-3 py-1.5 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          Unlink
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          Insert Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={uploadImage}
          accept="image/*"
          id="imageUpload"
        />
      </div>

      {/* Editor Content */}
      <div className="bg-gray-950 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;