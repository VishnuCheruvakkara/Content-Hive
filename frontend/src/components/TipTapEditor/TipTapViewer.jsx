import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

export default function TipTapViewer({ content }) {
    const editor = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            Image.configure({
                inline: true,
                HTMLAttributes: { class: "rounded-lg max-w-full h-auto mx-auto block" },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: content || "",
    });

    if (!editor) return null;

    return (
        <div className="prose prose-invert max-w-none">
            <EditorContent editor={editor} />
        </div>
    );
}
