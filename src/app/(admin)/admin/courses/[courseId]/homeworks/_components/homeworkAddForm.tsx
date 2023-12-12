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
import TypographyH3 from "@/components/ui/typography/h3";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().nonempty({ message: "Заголовок не может быть пустым" }),
});

type SchemaType = z.infer<typeof schema>;

const HomeworkAddForm = ({ courseId }: { courseId: number }) => {
  const utils = trpc.useUtils();
  const { toast } = useToast();
  const { register, handleSubmit, formState, control } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const createHomeworkMutation = trpc.homework.createHomework.useMutation({
    onSuccess(data) {
      toast({
        title: "Домашнее задание " + data?.title + " создан!",
        description: "Переводим на страницу",
      });
      router.push(`/admin/courses/${courseId}/homeworks/${data.id}/editor`);
    },
  });
  const onSubmit = (data: SchemaType) => {
    createHomeworkMutation.mutate({ title: data.title, courseId });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h5 className="font-bold text-lg">Создать домашнее задание</h5>
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
      <Button variant={"outline"} type="submit">
        Создать
      </Button>
    </form>
  );
};

export default HomeworkAddForm;
