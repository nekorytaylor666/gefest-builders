"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().nonempty({ message: "Заголовок не может быть пустым" }),
  description: z.string().nonempty({ message: "Добавьте описание" }),
});

type SchemaType = z.infer<typeof schema>;

const CourseCreateActionForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState, control } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const createCourseMutation = trpc.courses.createCourse.useMutation({
    onSuccess(data) {
      toast({
        title: "Урок " + data?.title + " создан!",
        description: "Переводим на страницу",
      });
      router.refresh();
    },
  });
  const onSubmit = (data: SchemaType) => {
    createCourseMutation.mutate({
      title: data.title,
      description: data.description,
      authorId: "1",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <Label>Заголовок</Label>
            <Input {...field} />
          </div>
        )}
      />
      {formState.errors.title?.message && (
        <span>{formState.errors.title.message.toString()}</span>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div>
            <Label>Описание</Label>
            <Input {...field} />
          </div>
        )}
      />
      {formState.errors.title?.message && (
        <span>{formState.errors.title.message.toString()}</span>
      )}
      <Button variant={"outline"} type="submit">
        Создать
      </Button>
    </form>
  );
};

export default CourseCreateActionForm;
