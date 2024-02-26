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
import { ecoLight, sandpackDark } from "@codesandbox/sandpack-themes";

import { useEffect, useRef } from "react";
//@ts-ignore
import { SandpackFileExplorer } from "sandpack-file-explorer";

const CustomEditor = () => {
  return (
    <>
      <SandpackLayout>
        <SandpackCodeEditor
          style={{ height: "600px" }}
          showLineNumbers={true}
          showRunButton={false}
        />
        <SandpackPreview
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

export const SandpackClient = ({ files }: { files: SandpackFiles }) => {
  return (
    <SandpackProvider
      theme={sandpackDark}
      customSetup={{
        entry: "/index.html",
      }}
      template="vanilla"
      files={files}
    >
      <CustomEditor />
    </SandpackProvider>
  );
};
