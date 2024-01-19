"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { defaultEditorProps } from "./props";
import { defaultExtensions } from "./extensions";
import { defaultEditorContent } from "./default-content";
import { EditorProps } from "@tiptap/pm/view";
import { Editor as EditorClass, Extensions } from "@tiptap/core";

export default function ContentReader({
  completionApi = "/api/generate",
  className = "relative min-h-[500px] w-full  border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg focus:ring-0",
  content = defaultEditorContent,
  extensions = [],
  editorProps = {},
  onUpdate = () => {},
  readonly = false,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  storageKey = "novel__content",
  disableLocalStorage = true,
}: {
  completionApi?: string;
  readonly?: boolean;
  className?: string;
  content?: JSONContent | string;
  extensions?: Extensions;
  editorProps?: EditorProps;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  debounceDuration?: number;
  storageKey?: string;
  disableLocalStorage?: boolean;
}) {
  useEffect(() => {
    editor?.commands.setContent(content);
    window.scrollBy({ top: 500, behavior: "smooth" });
  }, [content]);
  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],

    content: content,

    editorProps: {
      editable: () => !readonly,
      ...defaultEditorProps,
      ...editorProps,
    },

    autofocus: "start",
  });

  return (
    <div className={className}>
      {/* {editor && readonly && <ReadonlyBubbleMenu editor={editor} />} */}
      <EditorContent editor={editor} />
    </div>
  );
}
