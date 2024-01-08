import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

const SandpackAddForm = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  const onPrepareSubmit = async (data) => {
    const files = await Promise.all(
      acceptedFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: `/${file.name}`,
                content: {
                  code: reader.result,
                },
              });
            };
            reader.readAsText(file);
          })
      )
    ).then((fileContents) =>
      fileContents.reduce((acc, { name, content }) => {
        acc[name] = content;
        return acc;
      }, {})
    );
    onSubmit(files);
    console.log(files);
  };
  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="flex justify-center  h-full flex-col items-center gap-4"
        onSubmit={handleSubmit(onPrepareSubmit)}
      >
        {acceptedFiles.length > 0 && (
          <ul className="list-disc pl-5">
            {acceptedFiles.map((file, index) => (
              <li key={index}>{file.path}</li>
            ))}
          </ul>
        )}
        <div
          className="border-2 border-zinc-400 rounded-md p-4 w-full "
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <label>Перетащите файлы сюда или кликните для выбора файлов</label>
        </div>
        <Button type="submit">Добавить пример кода</Button>
      </form>
    </div>
  );
};

export default SandpackAddForm;
