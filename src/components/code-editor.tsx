import React, { Suspense, lazy, useState } from "react";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { Button } from "./ui/button";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));
const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#f5f5f5", // Light grey background
    foreground: "#333333", // Dark grey text
    caret: "#000000", // Black caret
    selection: "#d3d3d3", // Light grey selection
    selectionMatch: "#d3d3d3",
    lineHighlight: "#e8e8e8", // Slightly darker grey for line highlights
    gutterBackground: "#f5f5f5",
    gutterForeground: "#a9a9a9", // Dark grey for gutter text
  },
  styles: [
    { tag: t.comment, color: "#808080" }, // Standard grey for comments
    { tag: t.variableName, color: "#000000" }, // Black for variable names
    { tag: [t.string, t.special(t.brace)], color: "#696969" }, // Dim grey for strings and braces
    { tag: t.number, color: "#696969" },
    { tag: t.bool, color: "#696969" },
    { tag: t.null, color: "#696969" },
    { tag: t.keyword, color: "#696969" },
    { tag: t.operator, color: "#696969" },
    { tag: t.className, color: "#696969" },
    { tag: t.definition(t.typeName), color: "#696969" },
    { tag: t.typeName, color: "#696969" },
    { tag: t.angleBracket, color: "#696969" },
    { tag: t.tagName, color: "#696969" },
    { tag: t.attributeName, color: "#696969" },
  ],
});

const extensions = [javascript({ jsx: true })];

type Props = {
  expectedOutput?: string;
  onRun?: () => void;
  onSuccess?: () => void;
  onClear?: () => void;
  onCopy?: () => void;
  onSkip?: () => void;
};

const CodeEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState("");

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setEditorContent(value);
    console.log("value:", value);
  }, []);

  const onHandleCodeRun = () => {
    props.onRun && props.onRun();
    if (editorContent === props.expectedOutput) {
      props.onSuccess && props.onSuccess();
    }
  };

  const onHandleReset = () => {
    setEditorContent("");
    props.onClear && props.onClear();
  };

  return (
    <article className="border rounded my-4">
      <div className="p-2 bg-[#f1f1f1] border-b">
        <span className="text-sm font-bold font-mono ">Javascript</span>
      </div>
      <div className="min-h-[200px] bg-[#f5f5f5]">
        <Suspense fallback={<div>Loading...</div>}>
          <CodeMirror
            value={editorContent}
            height="200px"
            theme={myTheme}
            extensions={extensions}
            onChange={onChange}
          />
        </Suspense>
      </div>
      <div className="p-2 border-t  flex justify-between items-center">
        <Button onClick={onHandleCodeRun}>Запустить</Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={onHandleReset}
            className="align-baseline"
            variant={"ghost"}
          >
            <HiMiniArrowUturnLeft className="mr-2"></HiMiniArrowUturnLeft>
            <span>Очистить</span>
          </Button>
          <Button className="hidden lg:block" variant={"ghost"}>
            Копировать
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CodeEditor;
