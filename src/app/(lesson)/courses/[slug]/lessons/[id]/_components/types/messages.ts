import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Annotation = any; // Замените на ваш тип аннотации

export interface TextContent {
  type: string;
  text: {
    value: string;
    annotations: Annotation[];
  };
}

export interface AssistantMessage {
  id: string;
  object: string;
  created_at: number;
  thread_id: string;
  role: string;
  content: TextContent[];
  file_ids: string[];
  assistant_id: string | null;
  run_id: string | null;
  serializedContent: MDXRemoteSerializeResult;
  metadata: Record<string, unknown>;
}

export interface Body {
  object: string;
  data: AssistantMessage[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface Payload {
  body: Body;
  data: AssistantMessage[];
}
