"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { defaultEditorProps } from "./props";
import { defaultExtensions } from "./extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { defaultEditorContent } from "./default-content";
import { EditorBubbleMenu } from "./bubble-menu";
import { ImageResizer } from "./extensions/image-resizer";
import { EditorProps } from "@tiptap/pm/view";
import { Editor as EditorClass, Extensions, generateHTML } from "@tiptap/core";
import { readonlyExtensions } from "./extensions/read-only-extensions";
import { ReadonlyBubbleMenu } from "./comment-menu";

export default function Editor({
  completionApi = "/api/generate",
  className = "relative min-h-[500px] w-full  border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg focus:ring-0",
  defaultValue = defaultEditorContent,
  extensions = [],
  editorProps = {},
  onUpdate = () => {},
  readonly = false,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  storageKey = "novel__content",
  disableLocalStorage = true,
}: {
  /**
   * The API route to use for the OpenAI completion API.
   * Defaults to "/api/generate".
   */
  completionApi?: string;
  readonly?: boolean;
  /**
   * Additional classes to add to the editor container.
   * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg".
   */
  className?: string;
  /**
   * The default value to use for the editor.
   * Defaults to defaultEditorContent.
   */
  defaultValue?: JSONContent | string;
  /**
   * A list of extensions to use for the editor, in addition to the default Novel extensions.
   * Defaults to [].
   */
  extensions?: Extensions;
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
   * Defaults to {}.
   */
  editorProps?: EditorProps;
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  // eslint-disable-next-line no-unused-vars
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration?: number;
  /**
   * The key to use for storing the editor's value in local storage.
   * Defaults to "novel__content".
   */
  storageKey?: string;
  /**
   * Disable local storage read/save.
   * Defaults to false.
   */
  disableLocalStorage?: boolean;
}) {
  const [content, setContent] = useLocalStorage(storageKey, defaultValue);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    onDebouncedUpdate(editor);

    if (!disableLocalStorage) {
      setContent(json);
    }
  }, debounceDuration);

  const debouncedOnSelection = useDebouncedCallback((e) => {
    const selection = e.editor.state.selection;
    console.log(selection.ranges, selection.content());
  }, 750);

  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],

    content: defaultValue,

    editorProps: {
      editable: () => !readonly,
      ...defaultEditorProps,
      ...editorProps,
    },
    onUpdate: (e) => {
      onUpdate(e.editor);
      debouncedUpdates(e);
    },
    autofocus: "start",
  });

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={className}
    >
      {editor && !readonly && <EditorBubbleMenu editor={editor} />}
      {/* {editor && readonly && <ReadonlyBubbleMenu editor={editor} />} */}
      {editor?.isActive("image") && !readonly && (
        <ImageResizer editor={editor} />
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
