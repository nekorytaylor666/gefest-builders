import { supabase } from "./supabase";

export const setAuthClaims = async (
  uid: string,
  claim: string,
  value: unknown
) => {
  const { data, error } = await supabase.rpc("set_claim", {
    uid,
    claim,
    value,
  });
  return { data, error };
};
