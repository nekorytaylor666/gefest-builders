"use client";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const InvitePage = () => {
  const params = useSearchParams();
  useEffect(() => {
    async function setPremiumClaim() {
      // Проверяем, есть ли параметр "premium" в URL

      const hasPremiumParam = params.has("premium");

      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (hasPremiumParam) {
        const { data, error } = await supabase.rpc("set_claim", {
          claim: "premium",
          uid: session?.user.id,
          value: true,
        });

        // Обновляем сессию
        const res = await supabase.auth.refreshSession();
        // Устанавливаем claim "premium" в true
      }
    }
  }, []);
  return <div>InvitePage</div>;
};

export default InvitePage;
