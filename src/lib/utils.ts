import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type ProcedureReturnType<T> = T extends (
  ...args: any[]
) => PromiseLike<infer U>
  ? U
  : never;
