import React from "react";
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
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaAlignJustify,
    FaPaperclip
} from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import { FaImage } from "react-icons/fa";

// This function takes the image upload trigger function as parameter
export const getTipTapButtons = (triggerImageUpload,triggerFileUpload) => {
    return [
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
            { icon: <FaAlignLeft />, title: "Align Left", action: (ed) => ed.chain().focus().setTextAlign('left').run(), active: (ed) => ed.isActive({ textAlign: 'left' }) },
            { icon: <FaAlignCenter />, title: "Align Center", action: (ed) => ed.chain().focus().setTextAlign('center').run(), active: (ed) => ed.isActive({ textAlign: 'center' }) },
            { icon: <FaAlignRight />, title: "Align Right", action: (ed) => ed.chain().focus().setTextAlign('right').run(), active: (ed) => ed.isActive({ textAlign: 'right' }) },
            { icon: <FaAlignJustify />, title: "Align Justify", action: (ed) => ed.chain().focus().setTextAlign('justify').run(), active: (ed) => ed.isActive({ textAlign: 'justify' }) },
        ],
        [
            { icon: <FaListUl />, title: "Bullet List", action: (ed) => ed.chain().focus().toggleBulletList().run(), active: (ed) => ed.isActive("bulletList") },
            { icon: <FaListOl />, title: "Ordered List", action: (ed) => ed.chain().focus().toggleOrderedList().run(), active: (ed) => ed.isActive("orderedList") },
            { icon: <FaQuoteRight />, title: "Blockquote", action: (ed) => ed.chain().focus().toggleBlockquote().run(), active: (ed) => ed.isActive("blockquote") },
            { icon: <FaCode />, title: "Code Block", action: (ed) => ed.chain().focus().toggleCodeBlock().run(), active: (ed) => ed.isActive("codeBlock") },
        ],
        [
            { icon: <FaImage />, title: "Insert Image", action: () => triggerImageUpload() },
            { icon: <FaPaperclip />, title: "Attach File or Image", action: () => triggerFileUpload() },
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
};