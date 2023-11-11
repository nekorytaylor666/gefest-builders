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

const schema = z.object({
  title: z.string().nonempty({ message: "Заголовок не может быть пустым" }),
});

type SchemaType = z.infer<typeof schema>;

const LessonsPageAction = ({ courseId }: { courseId: number }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState, control } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });
  const createLessonMutation = trpc.lessons.createLesson.useMutation();
  const onSubmit = (data: SchemaType) => {
    createLessonMutation.mutate(
      { title: data.title, courseId },
      {
        onSuccess() {
          toast({
            title: "Урок " + data.title + " создан!",
            description: "Переводим на страницу",
          });
        },
      }
    );
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Добавить урок</Button>
        </PopoverTrigger>
        <PopoverContent>
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
            <Button variant={"outline"} type="submit">
              Создать
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LessonsPageAction;
