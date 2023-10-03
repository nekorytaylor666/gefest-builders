import React, { Suspense, lazy, useState } from "react";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { Button } from "./ui/button";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { isString } from "util";
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
  value?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
  onClear?: () => void;
  onCopy?: () => void;
  onSkip?: () => void;
  lang?: string;
  disabled?: boolean;
};

const CodeEditor: React.FC<Props> = (props) => {
  const value =
    typeof props.children === "string" ? props.children : props.value ?? "";
  const [editorContent, setEditorContent] = useState(value);
  const executeCodeMutation = useMutation(async (content: string) => {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "javascript",
        version: "1.32.3",
        files: [
          {
            name: "my_cool_code.js",
            content,
          },
        ],
        stdin: "",
        args: ["1", "2", "3"],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });

  const onChange = React.useCallback(
    (value: any, viewUpdate: any) => {
      if (props.disabled) return;
      setEditorContent(value);
    },
    [props.disabled]
  );

  const onHandleCodeRun = () => {
    props.onRun && props.onRun();
    executeCodeMutation.mutate(editorContent, {
      onSuccess: (data: any) => {
        const jobOutput = data.run.output;
        console.log(jobOutput, props.expectedOutput);
        if (jobOutput === props.expectedOutput) {
          props.onSuccess && props.onSuccess();
        }
      },
    });
  };

  const onHandleReset = () => {
    setEditorContent("");
    props.onClear && props.onClear();
  };

  return (
    <article className="border rounded my-4">
      <div className="p-2 bg-[#f1f1f1] border-b">
        <span className="text-sm font-bold font-mono ">
          {props?.lang ?? "Код"}
        </span>
      </div>
      <div className="min-h-[200px] bg-[#f5f5f5]">
        <Suspense fallback={<div>Loading...</div>}>
          <CodeMirror
            value={editorContent}
            height="auto"
            theme={myTheme}
            extensions={extensions}
            onChange={onChange}
          />
        </Suspense>
      </div>
      {props.onRun && (
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
      )}
    </article>
  );
};

export default CodeEditor;
