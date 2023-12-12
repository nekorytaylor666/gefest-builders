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

import HomeworkAddForm from "./homeworkAddForm";
const HomeworksPageActions = ({ courseId }: { courseId: number }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Добавить домашнее задание</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <HomeworkAddForm courseId={courseId}></HomeworkAddForm>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HomeworksPageActions;
