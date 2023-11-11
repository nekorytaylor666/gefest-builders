"use client";

import { MDXEditor, MDXEditorMethods, headingsPlugin } from "@mdxeditor/editor";
import { FC } from "react";
import { ALL_PLUGINS } from "./_boilerplate";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange: (markdown: string) => void;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  return (
    <MDXEditor
      contentEditableClassName="prose w-full"
      ref={editorRef}
      onChange={onChange}
      markdown={markdown}
      plugins={ALL_PLUGINS}
    />
  );
};

export default Editor;
