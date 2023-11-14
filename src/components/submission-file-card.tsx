import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type DownloadCardProps = {
  name: string;
  description: string;
  location: string;
};

const SubmissionFileCard: React.FC<DownloadCardProps> = ({
  name,
  description,
  location,
}) => (
  <Card key={name}>
    <CardHeader>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CardTitle className="text-left break-all truncate w-2/3">
              {name}
            </CardTitle>
          </TooltipTrigger>

          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CardDescription>
        {description === "" ? "Без описания" : description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-end items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="px-0"
                size={"icon"}
                variant={"outline"}
                asChild
              >
                <a href={location} className="text-muted-foreground">
                  <DownloadIcon className=" text-muted-foreground"></DownloadIcon>
                </a>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Скачать файл задания</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardContent>
  </Card>
);

export default SubmissionFileCard;
