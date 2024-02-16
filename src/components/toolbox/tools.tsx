import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { Check, Pen, Youtube } from "lucide-react";

export const toolsList = [
  {
    name: "Текст",
    icon: () => <Pen></Pen>,
    tooltip: "Добавить текст с удобным редактором",
  },
  {
    name: "Песочница",
    icon: () => <CodeSandboxLogoIcon className="h-6 w-6"></CodeSandboxLogoIcon>,
    tooltip: "Добавить песочницу",
  },

  {
    name: "Youtube",
    icon: () => <Youtube className="h-6 w-6"></Youtube>,
    tooltip: "Добавить видео с YouTube",
  },
  {
    name: "Тест",
    icon: () => <Check></Check>,
    tooltip: "Добавить тест",
  },
];

export type Tool = {
  name: string;
  icon: () => JSX.Element;
  tooltip: string;
};
