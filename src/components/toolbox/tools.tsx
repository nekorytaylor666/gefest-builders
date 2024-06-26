import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { Check, Pen, Video, Youtube } from "lucide-react";
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

import VideoTool from "./tools/video/video";
import VideoClient from "./tools/video/videoClient";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
/**
 * This list contains all the available blocks that can be added to the toolbox and rendered to user as lesson.
 * Each block has a name, an icon, and a tooltip for description.
 */

export const blockTypes = [
  "text",
  "sandbox",
  "loom",
  "quiz",
  "openQuestion",
] as const;
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
  openQuestion: {
    name: "Открытый вопрос",
    type: "openQuestion",
    icon: () => <Pen></Pen>,
    tooltip: "Добавить открытый вопрос",
    readComponent: ({ value }: { value: string }) => {
      return (
        <Card className="w-full lg:w-1/2 mx-auto">
          <CardHeader>
            <CardTitle>Открытый вопрос</CardTitle>
            <CardDescription>Ответьте на этот вопрос</CardDescription>
          </CardHeader>
          <CardContent>
            <Editor className="w-full" defaultValue={value} readonly></Editor>
          </CardContent>
          <CardFooter>
            <Textarea></Textarea>
            <Button>Ответить</Button>
          </CardFooter>
        </Card>
      );
    },
    component: ({
      value,
      onValueChange,
    }: {
      value: string;
      onValueChange: (value: string) => void;
    }) => {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Открытый вопрос</CardTitle>
            <CardDescription>
              Вставьте открытый вопрос в это поле
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Editor
              defaultValue={value}
              onDebouncedUpdate={(editor) => {
                if (!editor) return;
                const html = editor.getHTML();
                onValueChange(html);
              }}
              debounceDuration={500}
            ></Editor>
          </CardContent>
        </Card>
      );
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
  loom: {
    name: "Loom",
    type: "loom",
    icon: () => <Video className="h-6 w-6"></Video>,
    tooltip: "Добавить видео с YouTube",
    component: ({
      value,
      onValueChange,
    }: {
      value: string;
      onValueChange: (value: string) => void;
    }) => {
      return (
        <VideoTool value={value} onValueChange={onValueChange}></VideoTool>
      );
    },
    readComponent: ({ value }: { value: string }) => {
      return <VideoClient value={value}></VideoClient>;
    },
  },
};

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
