import { trpc } from "@/app/_trpc/client";
import { HiFire } from "react-icons/hi2";
import { toast } from "sonner";

export const useAddActivity = () => {
  const { mutate: addActivity } = trpc.activities.add.useMutation({
    onSuccess(data, variables, context) {
      toast(`Отличная работа ❤️‍🔥! Получай ${data.experience} огня Прометея.`, {
        description:
          "Огонь прометея поможет продвинуться в рейтинге чемпионов!",
        icon: <HiFire className="text-orange-600"></HiFire>,
        position: "top-center",
        duration: 2000,
      });
    },
  });
  return addActivity;
};
