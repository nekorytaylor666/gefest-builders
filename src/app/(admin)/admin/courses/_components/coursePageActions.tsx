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
import CourseCreateActionForm from "./courseAddActionForm";

const CoursePageActions = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Добавить курс</Button>
        </PopoverTrigger>
        <PopoverContent>
          <CourseCreateActionForm></CourseCreateActionForm>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CoursePageActions;
