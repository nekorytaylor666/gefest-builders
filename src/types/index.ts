import { ReactNode } from "react";

export interface PropsWithChildren<P> {
  children?: ReactNode;
}

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;
