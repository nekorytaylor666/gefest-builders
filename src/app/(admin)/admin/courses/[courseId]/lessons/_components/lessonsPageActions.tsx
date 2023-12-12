"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import LessonAddForm from "./lessonAddForm";
const LessonsPageAction = ({ courseId }: { courseId: number }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Добавить урок</Button>
        </PopoverTrigger>
        <PopoverContent>
          <LessonAddForm courseId={courseId}></LessonAddForm>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LessonsPageAction;
