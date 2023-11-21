"use client";
import { trpc } from "@/app/_trpc/client";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { RefreshIcon } from "@codesandbox/sandpack-react";

const UserCohortColumn = ({
  userCohorts,
  userId,
}: {
  userId: string;
  userCohorts: ({
    cohort: {
      id: number;
      name: string;
    };
  } & {
    userId: string;
    cohortId: number;
  })[];
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [cohorts] = trpc.cohorts.list.useSuspenseQuery();
  const { isLoading, mutate: addCohortMutation } =
    trpc.students.addCohort.useMutation();

  const utils = trpc.useUtils();
  const onSubmit = (data: any) => {
    addCohortMutation(
      {
        userId,
        cohortId: Number(data.cohortId),
      },
      {
        onSettled() {
          utils.students.list.invalidate();
        },
      }
    );
    reset();
  };

  const attachedCohortIds = userCohorts.map((uc) => uc.cohortId);
  const availableCohorts = cohorts.filter(
    (c) => !attachedCohortIds.includes(c.id)
  );

  return (
    <div className="w-64 flex flex-wrap gap-2">
      {userCohorts.map((el) => (
        <Badge key={el.cohortId + "_" + el.userId}>{el.cohort.name}</Badge>
      ))}

      <Popover>
        <PopoverTrigger>
          <Badge>
            {isLoading ? (
              <div className="animate-spin">
                <RefreshIcon />
              </div>
            ) : (
              <PlusIcon />
            )}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-[180px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              onValueChange={(value) => setValue("cohortId", value)}
              {...register("cohortId")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Когорта..." />
              </SelectTrigger>
              <SelectContent>
                {availableCohorts.map((el) => (
                  <SelectItem value={el.id.toString()} key={el.id}>
                    {el.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="mt-4" type="submit">
              Добавить
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserCohortColumn;
