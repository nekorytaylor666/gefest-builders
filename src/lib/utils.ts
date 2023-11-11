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

export const debounce = (func: Function, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};
