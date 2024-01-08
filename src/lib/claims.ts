import { supabase } from "./supabase";

const set_claim = async (uid: string, claim: string, value: object) => {
  const { data, error } = await supabase.rpc("set_claim", {
    uid,
    claim,
    value,
  });
  return { data, error };
};

const checkForAdmin = async () => {};
