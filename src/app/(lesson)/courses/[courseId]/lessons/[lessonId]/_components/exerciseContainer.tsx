"use client";
import React from "react";
import Editor from "@/components/editor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { UserNav } from "@/components/navbar/user-nav";
import { Button } from "@/components/ui/button";
import { Eye, Play, PlayCircle, PlayIcon, Undo } from "lucide-react";

const DEFAULT_PANEL_SIZE = {
  editor: 30,
  codePanel: 70,
  codeEditor: 85,
  CodeEditorHeight: 25,
  fileExplorer: 15,
  preview: 25,
};

const CodeEditorPanel = () => (
  <ResizablePanel defaultSize={DEFAULT_PANEL_SIZE.codeEditor}>
    <SandpackCodeEditor showTabs className="h-full" />
  </ResizablePanel>
);

const FileExplorerPanel = () => (
  <ResizablePanel defaultSize={DEFAULT_PANEL_SIZE.fileExplorer}>
    <SandpackFileExplorer className="h-full" />
  </ResizablePanel>
);

const PreviewPanel = () => (
  <ResizablePanel defaultSize={40}>
    <div className="p-2 flex items-center gap-2 bg-background border-b">
      <Button variant={"default"} size={"sm"}>
        <PlayCircle className="w-4 h-4 mr-1"></PlayCircle>
        Завершить
      </Button>
      <Button variant={"secondary"} size={"sm"}>
        <PlayCircle className="w-4 h-4 mr-1"></PlayCircle>
        Проверить
      </Button>
      <Button variant={"secondary"} size={"sm"}>
        <Eye className="w-4 h-4 mr-1"></Eye>
        Ответ
      </Button>
      <Button variant={"secondary"} size={"sm"}>
        <Undo className="w-4 h-4 mr-1"></Undo>
        Сбросить
      </Button>
    </div>
    <SandpackPreview className="h-full" />
  </ResizablePanel>
);

const ExerciseNavbar = () => {
  return (
    <div className="h-full w-full flex justify-end  items-center px-6">
      <UserNav></UserNav>
    </div>
  );
};

const ExerciseContainer = () => {
  return (
    <div className="h-screen grid grid-rows-[4rem_1fr]">
      <ExerciseNavbar />
      <div className="h-full  container max-w-screen-2xl">
        <SandpackProvider
          style={{ height: "100%" }}
          theme={sandpackDark}
          template="static"
          className="h-full bg-transparent border-0 "
        >
          <SandpackLayout
            style={{ background: "transparent", border: "0" }}
            className="h-full "
          >
            <ResizablePanelGroup
              direction="horizontal"
              className="rounded-lg   h-full bg-transparent border-0"
            >
              <ResizablePanel
                className="h-full"
                defaultSize={DEFAULT_PANEL_SIZE.editor}
              >
                <ScrollArea className="h-[calc(100vh-4rem-2px)] bg-background border-0">
                  <Editor readonly className="border-0 p-6" />
                  <Editor readonly className="border-0 p-6" />
                </ScrollArea>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={DEFAULT_PANEL_SIZE.codePanel}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={60}>
                    <ResizablePanelGroup direction="horizontal">
                      <CodeEditorPanel />
                      <ResizableHandle />
                      <FileExplorerPanel />
                    </ResizablePanelGroup>
                  </ResizablePanel>
                  <ResizableHandle />

                  <PreviewPanel />
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default ExerciseContainer;
