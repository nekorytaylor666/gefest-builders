import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TypographyH3 from "@/components/ui/typography/h3";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
  useSandpack,
  SandpackConsole,
  SandpackFiles,
  SandpackFileExplorer,
  SANDBOX_TEMPLATES,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { useEffect, useRef, useState } from "react";

const CustomEditor = ({
  onSave,
  onEntryChange,
  onTemplateChange,
}: {
  onSave: (files: SandpackFiles) => void;
  onEntryChange: (entry: string) => void;
  onTemplateChange: (template: keyof typeof SANDBOX_TEMPLATES) => void;
}) => {
  const { sandpack } = useSandpack();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-2xl font-semibold tracking-tight">Настройки</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-4">
          <Label>Шаблон</Label>
          <Select
            onValueChange={(value) => {
              sandpack.resetAllFiles();
              onTemplateChange(value as keyof typeof SANDBOX_TEMPLATES);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Шаблон" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(SANDBOX_TEMPLATES).map((file) => (
                <SelectItem key={file} value={file}>
                  {file}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      </CardContent>
    </Card>
  );
};

export const CustomSandpackAdmin = ({
  files,
  onFilesChange,
}: {
  files: SandpackFiles;
  onFilesChange: (files: SandpackFiles) => void;
}) => {
  const [entry, setEntry] = useState<string | null>(null);
  const [template, setTemplate] =
    useState<keyof typeof SANDBOX_TEMPLATES>("static");
  const onEntryChange = (entry: string) => {
    setEntry(entry);
  };

  const onTemplateChange = (template: keyof typeof SANDBOX_TEMPLATES) => {
    setTemplate(template);
  };

  return (
    <SandpackProvider
      theme={sandpackDark}
      customSetup={{
        entry: entry ?? "/index.html",
      }}
      template={template}
      files={files}
    >
      <CustomEditor
        onTemplateChange={onTemplateChange}
        onEntryChange={onEntryChange}
        onSave={onFilesChange}
      />
    </SandpackProvider>
  );
};
