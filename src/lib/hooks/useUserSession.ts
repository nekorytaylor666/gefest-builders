import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useStore } from "@/store/currentUserStore";

export const useUser = () => {
  const setUser = useStore((state) => state.setUser);
  const supabase = createClientComponentClient();

  const res = useQuery(["userSession"], () => supabase.auth.getUser(), {
    select(data) {
      return data.data;
    },
    onSuccess: (session) => {
      setUser(session?.user ?? null);
    },
  });

  return { ...res, supabase };
};
