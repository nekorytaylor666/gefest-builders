import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, getUrlFromString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatBubbleIcon, CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { Editor, generateHTML } from "@tiptap/core";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface CommentFormProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
import { z } from "zod";
import { defaultExtensions } from "../extensions";

const CommentSchema = z.object({
  comment: z
    .string()
    .min(10, "Комментарий должен содержать не менее 10 символов"),
});
type CommentFormValues = z.infer<typeof CommentSchema>;

export const CommentForm: FC<CommentFormProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: CommentFormValues) => {
    const comment = e.comment;

    const selection = editor.state.selection;

    const anchor = selection.anchor;
    const from = selection.from;
    const to = selection.to;
    const head = selection.head;
    const childCount = selection.content().content.childCount;
    const content = [];
    for (let index = 0; index < childCount; index++) {
      const children = selection.content().content.child(index);
      if (!children.isTextblock) break;
      content.push(children.textContent);
    }
    console.log(selection.content());
    setIsOpen(false);
    console.log(comment, { anchor, from, to, head, content: content });
  };
  // Autofocus on input by default
  useEffect(() => {
    setFocus("comment");
  });

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">
          <ChatBubbleIcon></ChatBubbleIcon>
        </p>
        <p
          className={cn("underline decoration-stone-400 underline-offset-4", {
            "text-blue-500": editor.isActive("link"),
          })}
        >
          Комментировать
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed top-full z-[99999] mt-1 flex flex-col gap-2 w-96 min-h-40 overflow-hidden rounded border border-stone-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <Textarea
            {...register("comment")}
            placeholder="Напишите свой комментарий"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message?.toString()}</p>
          )}
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          ) : (
            <Button type="submit" className="flex items-center justify-center ">
              Отправить
              <CheckIcon className="h-4 w-4" />
            </Button>
          )}
        </form>
      )}
    </div>
  );
};
