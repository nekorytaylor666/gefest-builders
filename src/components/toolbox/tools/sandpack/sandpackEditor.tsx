import { Button } from "@/components/ui/button";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
  useSandpack,
  SandpackConsole,
  SandpackFiles,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { useEffect, useRef } from "react";
//@ts-ignore
import { SandpackFileExplorer } from "sandpack-file-explorer";

const CustomEditor = ({
  onSave,
}: {
  onSave: (files: SandpackFiles) => void;
}) => {
  const { sandpack } = useSandpack();

  return (
    <>
      <SandpackLayout>
        <SandpackFileExplorer />

        <SandpackCodeEditor
          style={{ height: "600px" }}
          showLineNumbers={true}
          showRunButton={false}
        />
        <SandpackPreview
          actionsChildren={
            <Button
              variant={"secondary"}
              onClick={() => onSave(sandpack.files)}
            >
              Сохранить песочницу
            </Button>
          }
          showNavigator
          style={{ height: "600px" }}
          showOpenInCodeSandbox={false}
        >
          <SandpackConsole
            showResetConsoleButton={false}
            style={{ height: "300px" }}
          />
        </SandpackPreview>
      </SandpackLayout>
    </>
  );
};

export const CustomSandpackAdmin = ({
  files,
  onFilesChange,
}: {
  files: SandpackFiles;
  onFilesChange: (files: SandpackFiles) => void;
}) => {
  return (
    <SandpackProvider
      theme={sandpackDark}
      customSetup={{
        entry: "/index.html",
      }}
      template="vanilla"
      files={files}
    >
      <CustomEditor onSave={onFilesChange} />
    </SandpackProvider>
  );
};
