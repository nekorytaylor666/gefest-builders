import { serverClient } from "@/app/_trpc/serverClient";
import SubmissionFileCard from "@/components/submission-file-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";

import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { inferAsyncReturnType } from "@trpc/server";
import React from "react";

const MARK_EMOJIS = {
  1: {
    label:
      "Нулевой успех, но помни: каждая ошибка - это шанс научиться чему-то новому!",
    emoji: "🌱",
  },
  2: {
    label: "Двойка - не конец, а начало. Вперед, за знаниями!",
    emoji: "🚀",
  },
  3: {
    label: "Тройка - ты на пути. Есть куда стремиться, продолжай учиться!",
    emoji: "🛤️",
  },
  4: {
    label: "Четверка - хорошо, но можно лучше. Ты на правильном пути!",
    emoji: "🌟",
  },
  5: {
    label:
      "Пятерка - молодец! У тебя хорошо получается, продолжай в том же духе!",
    emoji: "👍",
  },
  6: {
    label: "Шестерка - отлично! Ты на верном пути, дальше - больше!",
    emoji: "💪",
  },
  7: {
    label: "Семерка - замечательно! Ты на пороге успеха, так держать!",
    emoji: "🎯",
  },
  8: {
    label: "Восьмерка - прекрасно! Ты близок к вершине, не останавливайся!",
    emoji: "🏔️",
  },
  9: {
    label: "Девятка - потрясающе! Ты на вершине, продолжай в том же духе!",
    emoji: "🌈",
  },
  10: {
    label: "Десятка - высший класс! Ты доказал свое мастерство!",
    emoji: "🏆",
  },
  11: {
    label: "Одинадцать - феноменально! Ты превзошел все ожидания!",
    emoji: "🚀",
  },
  12: {
    label: "Двенадцать - ты лучший из лучших, настоящий Гений!",
    emoji: "👑",
  },
};

interface HomeworkMarkProp {
  submission: inferAsyncReturnType<
    typeof serverClient.submissions.getSubmissionOfUserByHomeWorkId
  >;
}

const HomeworkMark = ({ submission }: HomeworkMarkProp) => {
  return (
    <Card className="w-full col-span-2 flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Задание проверено!
          </h2>
        </CardTitle>
        <CardDescription className="h-full flex flex-col justify-center">
          <div>Оценка:</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 w-full ">
          <h3 className="text-3xl font-bold">
            {submission?.review?.mark}{" "}
            {submission?.review?.mark &&
              MARK_EMOJIS[submission?.review?.mark].emoji}
          </h3>
          <p className="text-muted-foreground">
            {submission?.review?.mark &&
              MARK_EMOJIS[submission?.review?.mark].label}
          </p>
          <div>
            <Label>Комментарий от учителя:</Label>
            <p className="p-4 rounded border-2 border-muted">
              {submission?.review?.comment}
            </p>
          </div>
        </div>
        <Collapsible className="mt-12">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="default">
              <CaretSortIcon className="h-6 w-6" />
              <h4 className="text-sm font-semibold">Файлы ответа</h4>
              <span className="sr-only">Раскрыть</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {submission?.fileUploads.map((el: any) => (
                <SubmissionFileCard key={el.name} {...el}></SubmissionFileCard>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default HomeworkMark;
