import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Button from "../../components/ui/Button";
import TipTapMenu from "./TipTapComponents/MenuButton";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import UserAuthenticatedAxios from "../../axios/UserAuthenticateAxios"
import toast from "react-hot-toast";
import TextAlign from '@tiptap/extension-text-align';
import { getTipTapButtons } from "./TipTapComponents/Icons";

export default function TipTapEditor({ onSubmit }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
    content: "<p></p>",
  }, []);

  if (!editor) return null;

  const handleSubmit = () => {
    const json = editor.getJSON();
    onSubmit(json);
  };

  const handleImageUpload = async (file) => {
    const toastId = toast.loading("Uploading image...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await UserAuthenticatedAxios.post('/blog/upload-image/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response?.data?.data;
      toast.success("Image added", { id: toastId });
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error("Failed to upload image", { id: toastId });
    }
  };

  const handleFileUpload = async (file) => {
    const toastId = toast.loading("Uploading file...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await UserAuthenticatedAxios.post('/blog/upload-file/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileUrl = response?.data?.data;
      const fileName = fileUrl.split('/').pop();
      toast.success("File attached", { id: toastId });

      editor.chain().focus().insertContent(`
        <p class="file-box">
          <a href="${fileUrl}" target="_blank">${fileName}</a>
        </p>
      `).run();


    } catch (error) {
      console.error('File upload failed:', error);
      toast.error("Failed to upload file", { id: toastId });
    }
  };

  const triggerImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        await handleImageUpload(file);
      }
    };

    input.click();
  };

  // Updated to match backend allowed types
  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx'; // only allowed by backend

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        await handleFileUpload(file);
      }
    };

    input.click();
  };

  const buttons = getTipTapButtons(triggerImageUpload, triggerFileUpload);

  return (
    <div className="border-white/30 p-3 bg-brand-2/50 text-white">
      <TipTapMenu editor={editor} buttons={buttons} />

      <div className="h-[400px] mb-3 overflow-y-auto p-4 bg-gray-900/30 border border-white/10">
        <EditorContent
          editor={editor}
          className="ProseMirror max-w-none min-h-[350px] focus:outline-none"
        />
      </div>

      <div className="flex justify-end">
        <Button className="px-6 py-2 bg-brand-3 text-white rounded-sm" onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </div>
  );
}
