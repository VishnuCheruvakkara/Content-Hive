import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Button from "../../components/ui/Button";
import TipTapMenu from "./TipTapComponents/MenuButton";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaParagraph,
  FaHeading,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaHighlighter,
  FaEraser,
} from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";

export default function TipTapEditor({ onSubmit }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  },[]);

  if (!editor) return null;

  const handleSubmit = () => {
    const json = editor.getJSON();
    onSubmit(json);
  };

  const buttons = [
    [
      { icon: <FaParagraph />, title: "Paragraph", action: (ed) => ed.chain().focus().setParagraph().run(), active: (ed) => ed.isActive("paragraph") },
      { icon: <FaHeading />, title: "Heading 1", action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(), active: (ed) => ed.isActive("heading", { level: 1 }) },
      { icon: <FaHeading className="text-sm" />, title: "Heading 2", action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(), active: (ed) => ed.isActive("heading", { level: 2 }) },
    ],
    [
      { icon: <FaBold />, title: "Bold", action: (ed) => ed.chain().focus().toggleBold().run(), active: (ed) => ed.isActive("bold") },
      { icon: <FaItalic />, title: "Italic", action: (ed) => ed.chain().focus().toggleItalic().run(), active: (ed) => ed.isActive("italic") },
      { icon: <FaUnderline />, title: "Underline", action: (ed) => ed.chain().focus().toggleUnderline().run(), active: (ed) => ed.isActive("underline") },
      { icon: <FaStrikethrough />, title: "Strike", action: (ed) => ed.chain().focus().toggleStrike().run(), active: (ed) => ed.isActive("strike") },

      { icon: <FaHighlighter />, title: "Highlight", action: (ed) => ed.chain().focus().toggleHighlight().run(), active: (ed) => ed.isActive("highlight") },

    ],
    [
      { icon: <FaListUl />, title: "Bullet List", action: (ed) => ed.chain().focus().toggleBulletList().run(), active: (ed) => ed.isActive("bulletList") },
      { icon: <FaListOl />, title: "Ordered List", action: (ed) => ed.chain().focus().toggleOrderedList().run(), active: (ed) => ed.isActive("orderedList") },
      { icon: <FaQuoteRight />, title: "Blockquote", action: (ed) => ed.chain().focus().toggleBlockquote().run(), active: (ed) => ed.isActive("blockquote") },
      { icon: <FaCode />, title: "Code Block", action: (ed) => ed.chain().focus().toggleCodeBlock().run(), active: (ed) => ed.isActive("codeBlock") },
    ],
    [
      { icon: <GoHorizontalRule />, title: "Horizontal Rule", action: (ed) => ed.chain().focus().setHorizontalRule().run() },
      { icon: <FaEraser />, title: "Clear", action: (ed) => ed.chain().focus().clearContent().run() },
    ],
    [
      { icon: <FaUndo />, title: "Undo", action: (ed) => ed.chain().focus().undo().run(), },
      { icon: <FaRedo />, title: "Redo", action: (ed) => ed.chain().focus().redo().run(), },
    ],
  ];

  return (
    <div className=" border-white/30 p-3 bg-brand-2/50 text-white ">
      <TipTapMenu editor={editor} buttons={buttons} />

      <div className="min-h-[400px] mb-4 p-4 bg-gray-900/30 border border-white/10 focus-within:border-white/30 transition-colors">
        <EditorContent
          editor={editor}
          className=" ProseMirror max-w-none min-h-[350px] focus:outline-none"
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