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

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}

export function uuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
