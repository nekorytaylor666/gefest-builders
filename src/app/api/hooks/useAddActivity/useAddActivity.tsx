import { trpc } from "@/app/_trpc/client";
import { Flame } from "lucide-react";
import { toast } from "sonner";

export const useAddActivity = () => {
  const { mutate: addActivity } = trpc.activities.add.useMutation({
    onSuccess(data, variables, context) {
      toast(`Отличная работа ❤️‍🔥! Получай ${data.experience} огня Прометея.`, {
        description:
          "Огонь прометея поможет продвинуться в рейтинге чемпионов!",
        icon: <Flame className="text-orange-500"></Flame>,
        position: "top-center",
        duration: 2000,
      });
    },
  });
  return addActivity;
};
