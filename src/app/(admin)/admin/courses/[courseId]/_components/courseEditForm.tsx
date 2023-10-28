"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { inferAsyncReturnType } from "@trpc/server";
import { serverClient } from "@/app/_trpc/serverClient";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type Course = inferAsyncReturnType<
  (typeof serverClient)["courses"]["listCourses"]
>[0];

const formSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  disabled: z.boolean(),
});

export function CouseEditForm({ course }: { course: Course }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      description: course.description,
      disabled: course.disabled,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Без заголовка" {...field} />
              </FormControl>
              <FormDescription>Заголовок вашего курса</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Слаг</FormLabel>
              <FormControl>
                <Input placeholder="Без слага" {...field} />
              </FormControl>
              <FormDescription>
                Слаг по которому будут находить ваш курс
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Без описания" {...field} />
              </FormControl>
              <FormDescription>Описание вашего курса</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="disabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Скрытый</FormLabel>
                <FormDescription>
                  Будет скрыт с главной страницы и лендингов
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Изменить</Button>
      </form>
    </Form>
  );
}
