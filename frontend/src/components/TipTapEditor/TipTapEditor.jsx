import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Button from "../../components/ui/Button";
import TipTapMenu from "./TipTapComponents/MenuButton";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import toast from "react-hot-toast";
import TextAlign from '@tiptap/extension-text-align';
import { getTipTapButtons } from "./TipTapComponents/Icons";
import { triggerImageUpload } from "./TipTapComponents/ImageUpload";
import { triggerFileUpload } from "./TipTapComponents/FileUpload";
import { validateBlogForm } from "../../validations/ValidateBlogFormSubmission";

export default function TipTapEditor({ onSubmit, defaultTitle = "", defaultDescription = "",defaultContent = "", }) {

  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Start writing your blog...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: { class: 'rounded-lg max-w-full h-auto mx-auto block' },
      }),
    ],
    content: defaultContent || "",
  }, []);

  if (!editor) return null;

  const handleSubmit = () => {
   
    const contentHtml = editor.getHTML();

    const isValid = validateBlogForm({ title, description, contentHtml });
    if (!isValid) return;

    onSubmit({
      title: title,
      description: description,
      content_html: contentHtml,
    });
  };

  const buttons = getTipTapButtons(() => triggerImageUpload(editor), () => triggerFileUpload(editor));

  return (

    <>
      <div className="mb-3">
        <label htmlFor="blog-title" className="block mb-2 text-white font-medium ">
          Blog Title
        </label>
        <input
          id="blog-title"
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-900/50 border border-white/20 text-white rounded-sm outline-none focus:outline-none focus:ring-2 focus:ring-brand-3"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="blog-description" className="block mb-2 text-white font-medium"> 
          Short Description
        </label>
        <textarea
          id="blog-description"
          placeholder="Short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-900/50 border border-white/20 text-white rounded-sm outline-none h-20 focus:outline-none focus:ring-2 focus:ring-brand-3"
        />
      </div>

      <div className="border-white/30 p-3 bg-brand-2/50 text-white">
        <TipTapMenu editor={editor} buttons={buttons} />

        <div className="h-[400px] mb-3 overflow-y-auto p-4 bg-gray-900/30 border border-white/10">
          <EditorContent
            editor={editor}
            className="ProseMirror max-w-none min-h-[350px] focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="px-6 py-2 bg-brand-3 text-white rounded-sm"
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </div>
      </div>
    </>

  );
}
