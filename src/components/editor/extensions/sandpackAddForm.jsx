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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";

const SandpackAddForm = ({ onSubmit }) => {
  const form = useForm();
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
    onSubmit({ files, ...data });
  };
  return (
    <Form {...form}>
      <div className="flex items-center justify-center h-full">
        <form
          className="flex justify-center h-full flex-col items-center gap-4 max-w-md"
          onSubmit={form.handleSubmit(onPrepareSubmit)}
        >
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Шаблон</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите шаблон наиболее подходящий под ваш пример" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="static">HTML/CSS</SelectItem>
                    <SelectItem value="vanilla">Javascript/Test</SelectItem>
                    <SelectItem value="node">NodeJS</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Шаблон влияет какие окна будут видны пользователю.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {acceptedFiles.length > 0 && (
            <ul className="list-disc pl-5">
              {acceptedFiles.map((file, index) => (
                <li key={index}>{file.path}</li>
              ))}
            </ul>
          )}
          <div
            className="border shadow  rounded-md p-4 w-full "
            {...getRootProps()}
          >
            <input className="hidden" {...getInputProps()} />
            <label>Перетащите файлы сюда или кликните для выбора файлов</label>
          </div>
          <Button type="submit">Добавить пример кода</Button>
        </form>
      </div>
    </Form>
  );
};

export default SandpackAddForm;
