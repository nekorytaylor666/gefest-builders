import LectureContent from "@/components/lecture-content";
import { divideMarkdown, serializeAllMdxSections } from "@/lib/mdx-utils";
import { serverClient } from "@/app/_trpc/serverClient";
import fs from "fs";
import { APP_CONFIG } from "@/lib/config";
import AssistantChat from "./_components/assistantInput";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;
  const course = await serverClient.courses.getCourseBySlug(slug);
  let content;
  if (APP_CONFIG.FETCH_LOCALLY) {
    const path = `src/content/${slug}/lessons/${id}/content.mdx`;
    try {
      content = fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  } else {
    const response = await fetch(
      `https://gefest.b-cdn.net/${slug}/lessons/${id}/content.mdx`
    );
    content = await response.text();
  }

  const mdxSections = divideMarkdown(content);

  const serializedSections = await serializeAllMdxSections(mdxSections);

  return (
    <Sheet>
      <main className="relative">
        <LectureContent
          course={course}
          lessonId={parseInt(id)}
          serializedMdxSections={serializedSections}
        ></LectureContent>

        {/* <SheetTrigger className="sticky bottom-4 left-4">
          <Button className="w-16 h-16" variant={"outline"} size={"icon"}>
            <ChatBubbleIcon className="w-8 h-8"></ChatBubbleIcon>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] lg:w-1/2 max-w-screen-2xl">
          <SheetHeader>
            <SheetTitle>Ваш Гефест ассистент</SheetTitle>
          </SheetHeader>

          <Suspense
            fallback={
              <Skeleton className="w-full h-[800px] rounded-md"></Skeleton>
            }
          >
            <AssistantChat></AssistantChat>
          </Suspense>
        </SheetContent> */}
      </main>
    </Sheet>
  );
}
