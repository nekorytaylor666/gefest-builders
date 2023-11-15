import React from "react";
import { AssistantMessage } from "./types/messages";
import { Label } from "@/components/ui/label";
import MDXRenderer from "@/components/mdx-renderer";

const AssistantChatContainer = ({
  messages,
}: {
  messages: AssistantMessage[];
}) => {
  console.log("messages", messages);
  return (
    <div className="grid grid-cols-8 gap-8">
      {messages?.map((el) => (
        <ChatBubble key={el.id} message={el}></ChatBubble>
      ))}
    </div>
  );
};

const ChatBubble = ({ message }: { message: AssistantMessage }) => {
  if (message.role === "user") return <UserChatBubble message={message} />;
  if (message.role === "assistant")
    return <AssistantChatBubble message={message}></AssistantChatBubble>;
};

const AssistantChatBubble = ({ message }: { message: AssistantMessage }) => {
  return (
    <div className="col-span-7 col-start-1 bg-muted rounded-md p-4 flex flex-col">
      <Label className="pb-2 font-bold">Гефест ассистент:</Label>
      <MDXRenderer content={message.serializedContent}></MDXRenderer>
    </div>
  );
};

const UserChatBubble = ({ message }: { message: AssistantMessage }) => {
  return (
    <div className="col-span-7 col-start-2 bg-muted rounded-md p-4 flex flex-col">
      <Label className="pb-2 font-bold">Вы:</Label>
      <MDXRenderer content={message.serializedContent}></MDXRenderer>
    </div>
  );
};
export default AssistantChatContainer;
