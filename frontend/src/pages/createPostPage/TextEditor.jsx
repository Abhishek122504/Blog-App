import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-4">

      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2 mb-3">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded"
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded"
        >
          <i>I</i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-3 py-1 border rounded"
        >
          <s>S</s>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded"
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-3 py-1 border rounded"
        >
          1. List
        </button>

      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

    </div>
  );
}