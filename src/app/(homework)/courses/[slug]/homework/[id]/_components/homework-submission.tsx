"use client";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const validationSchema = z.object({
  submission: z
    .array(
      z.object({
        file: z.any(),
        name: z.string().min(1, { message: "Product Name is required" }),
        description: z.string().optional(),
      })
    )
    .nonempty({ message: "Product is required" }),
});

type FormValues = z.infer<typeof validationSchema>;

const HomeworkSubmission = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      submission: [],
    },
  });

  const [paths, setPaths] = useState([]);
  const [isFileHovered, setIsFileHovered] = useState(false);
  const onDrop: any = useCallback(
    (acceptedFiles: any) => {
      setPaths(acceptedFiles.map((file: any) => URL.createObjectURL(file)));
    },
    [setPaths]
  );

  const { fields, append, remove } = useFieldArray({
    name: "submission",
    control: form.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="submission"
          render={() => (
            <Dropzone
              onDragEnter={() => setIsFileHovered(true)}
              onDragLeave={() => setIsFileHovered(false)}
              onDropAccepted={(acceptedFiles) => {
                console.log(acceptedFiles);
                onDrop(acceptedFiles);
                acceptedFiles.map((acceptedFile) => {
                  return append({
                    file: acceptedFile,
                    name: acceptedFile.name,
                    description: "",
                  });
                });
              }}
              onDrop={() => setIsFileHovered(false)}
              multiple={true}
              maxSize={5000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({
                    className: cn(
                      "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer min-h-[300px] border-dashed border-2 border-[#e2e8f0] hover:bg-muted hover:border-muted-foreground transition-all duration-200",
                      isFileHovered && " bg-muted border-muted-foreground "
                    ),
                  })}
                >
                  <div className="flex items-center gap-x-3 mt-2 mb-2">
                    <label
                      htmlFor="Products"
                      className={`text-lg font-medium text-[7E8DA0]  cursor-pointer focus:outline-none focus:underline   ${
                        form.formState.errors.submission && "text-red-500"
                      }`}
                      tabIndex={0}
                    >
                      <span className="underline "> Тыкни на поле</span> или
                      перетащи сюды, чтобы загрузить файл 📁
                      <input {...getInputProps()} />
                    </label>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        />
        <Separator className="my-2" />
        <div className="flex flex-col gap-4">
          {fields.map((item, index) => (
            <div className=" border p-3 rounded-md flex gap-1" key={item.name}>
              <div className="w-full" key={item.id}>
                <FormField
                  control={form.control}
                  name={`submission.${index}.name`}
                  render={({ field }) => (
                    <input
                      className="text-lg font-bold w-full focus:outline-none focus:bg-muted rounded-md py-1 px-3"
                      {...field}
                      defaultValue={item.name}
                      tabIndex={-1}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name={`submission.${index}.description`}
                  render={({ field }) => (
                    <input
                      className="text-md  text-muted-foreground w-full focus:outline-none focus:bg-muted rounded-md py-1 px-3"
                      {...field}
                      placeholder="Без описания"
                      defaultValue={item.description}
                      tabIndex={-1}
                    />
                  )}
                />
              </div>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => remove(index)}
                className=""
              >
                <Cross1Icon></Cross1Icon>
              </Button>
            </div>
          ))}
        </div>
        <div className=" mt-4">
          <Button type="submit" size={"lg"} className="w-full">
            Сдать на проверку
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HomeworkSubmission;
