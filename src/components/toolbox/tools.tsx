import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { Check, Pen, Youtube } from "lucide-react";
import Editor from "@/components/editor";
import { Quiz } from "./tools/quiz/quiz";
import QuizEditor, { QuizEditorValue } from "./tools/quiz/quizEditor";
import {
  Sandpack,
  SandpackFiles,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { CustomSandpackAdmin } from "./tools/sandpack/sandpackEditor";
import { SandpackClient } from "./tools/sandpack/sandpack";
/**
 * This list contains all the available blocks that can be added to the toolbox and rendered to user as lesson.
 * Each block has a name, an icon, and a tooltip for description.
 */

export const blockTypes = ["text", "sandbox", "youtube", "quiz"] as const;
export const blocksList: Record<GBlockType, GBlock> = {
  text: {
    name: "Текст",
    type: "text",
    icon: () => <Pen></Pen>,
    tooltip: "Добавить текст с удобным редактором",
    component: ({
      value,
      onValueChange,
    }: {
      value: string;
      onValueChange: (value: string) => void;
    }) => {
      return (
        <Editor
          defaultValue={value}
          onDebouncedUpdate={(editor) => {
            if (!editor) return;
            const html = editor.getHTML();
            onValueChange(html);
          }}
          debounceDuration={500}
        ></Editor>
      );
    },
    readComponent: ({ value }: { value: string }) => {
      return <Editor className="w-full" defaultValue={value} readonly></Editor>;
    },
  },
  quiz: {
    name: "Тест",
    type: "quiz",
    icon: () => <Check></Check>,
    tooltip: "Добавить тест",
    component: ({
      onValueChange,
      value,
    }: {
      onValueChange: (value: QuizEditorValue) => void;
      value: QuizEditorValue;
    }) => <QuizEditor value={value} onValueChange={onValueChange}></QuizEditor>,
    readComponent: ({ value }: { value: QuizEditorValue }) => {
      return <Quiz {...value}></Quiz>;
    },
  },
  sandbox: {
    name: "Песочница",
    type: "sandbox",
    icon: () => <CodeSandboxLogoIcon className="h-6 w-6"></CodeSandboxLogoIcon>,
    tooltip: "Добавить песочницу",
    component: ({
      value,
      onValueChange,
    }: {
      value: SandpackFiles;
      onValueChange: (value: SandpackFiles) => void;
    }) => {
      return (
        <CustomSandpackAdmin
          files={value}
          onFilesChange={onValueChange}
        ></CustomSandpackAdmin>
      );
    },
    readComponent: ({ value }: { value: SandpackFiles }) => {
      return <SandpackClient files={value}></SandpackClient>;
    },
  },
  youtube: {
    name: "Текст",
    type: "text",
    icon: () => <Pen></Pen>,
    tooltip: "Добавить текст с удобным редактором",
    component: ({
      value,
      onValueChange,
    }: {
      value: string;
      onValueChange: (value: string) => void;
    }) => {
      return (
        <Editor
          defaultValue={value}
          onUpdate={(editor) => {
            if (!editor) return;
            const html = editor.getHTML();
            onValueChange(html);
          }}
        ></Editor>
      );
    },
    readComponent: ({ value }: { value: QuizEditorValue }) => {
      return <Quiz value={value}></Quiz>;
    },
  },
};
// {
//   name: "Песочница",
//   type: "sandbox",
//   icon: () => <CodeSandboxLogoIcon className="h-6 w-6"></CodeSandboxLogoIcon>,
//   tooltip: "Добавить песочницу",
// },

// {
//   name: "Youtube",
//   type: "youtube",
//   icon: () => <Youtube className="h-6 w-6"></Youtube>,
//   tooltip: "Добавить видео с YouTube",
// },
// {
//   name: "Тест",
//   type: "quiz",
//   icon: () => <Check></Check>,
//   tooltip: "Добавить тест",
// },

export type GBlock = {
  name: string;
  type: (typeof blockTypes)[number];
  icon: () => JSX.Element;
  tooltip: string;
  component: (props: {
    value: any;
    onValueChange: (value: any) => void;
  }) => JSX.Element;
  readComponent: (props: { value: any }) => JSX.Element;
};

export type GBlockType = GBlock["type"];
