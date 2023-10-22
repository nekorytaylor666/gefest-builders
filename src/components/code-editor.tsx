import React, { Suspense, lazy, useState } from "react";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { Button } from "./ui/button";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { isString } from "util";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));
const smoothy = createTheme({
  theme: "light",
  settings: {
    fontFamily: "monospace",
    background: "#FFFFFF",
    foreground: "#000000",
    caret: "#000000",
    selection: "#FFFD0054",
    gutterBackground: "#FFFFFF",
    gutterForeground: "#00000070",
    lineHighlight: "#00000008",
  },
  styles: [
    {
      tag: t.comment,
      color: "#CFCFCF",
    },
    {
      tag: [t.number, t.bool, t.null],
      color: "#E66C29",
    },
    {
      tag: [
        t.className,
        t.definition(t.propertyName),
        t.function(t.variableName),
        t.labelName,
        t.definition(t.typeName),
      ],
      color: "#2EB43B",
    },
    {
      tag: t.keyword,
      color: "#D8B229",
    },
    {
      tag: t.operator,
      color: "#4EA44E",
      fontWeight: "bold",
    },
    {
      tag: [t.definitionKeyword, t.modifier],
      color: "#925A47",
    },
    {
      tag: t.string,
      color: "#704D3D",
    },
    {
      tag: t.typeName,
      color: "#2F8996",
    },
    {
      tag: [t.variableName, t.propertyName],
      color: "#77ACB0",
    },
    {
      tag: t.self,
      color: "#77ACB0",
      fontWeight: "bold",
    },
    {
      tag: t.regexp,
      color: "#E3965E",
    },
    {
      tag: [t.tagName, t.angleBracket],
      color: "#BAA827",
    },
    {
      tag: t.attributeName,
      color: "#B06520",
    },
    {
      tag: t.derefOperator,
      color: "#000",
    },
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
      <div className="bg-[#f5f5f5]">
        <Suspense fallback={<div>Loading...</div>}>
          <CodeMirror
            value={editorContent}
            height="auto"
            theme={smoothy}
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
