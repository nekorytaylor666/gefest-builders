import { OpenAI } from "openai";
import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  render,
} from "ai/rsc";
import { z } from "zod";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nanoid } from "ai";
import { Quiz } from "@/components/toolbox/tools/quiz/quiz";
import { Skeleton } from "@/components/ui/skeleton";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export function createSubmitUserMessage(lessonContent: string) {
  return async function submitUserMessage(userInput: string) {
    "use server";

    const aiState = getMutableAIState<typeof AI>();

    // Update the AI state with the new user message.
    aiState.update([
      ...aiState.get(),

      {
        role: "user",
        content: userInput,
      },
    ]);

    // The `render()` creates a generated, streamable UI.
    const ui = render({
      model: "gpt-4o-mini",
      provider: openai,
      messages: [
        {
          role: "system",
          content: `Ты учитель программирования. Помогаешь ученикам с HTML, CSS, Javascript. Ты помогаешь студенту понять этот урок: ${lessonContent}`,
        },
        { role: "user", content: userInput },
      ],
      // `text` is called when an AI returns a text response (as opposed to a tool call).
      // Its content is streamed from the LLM, so this function will be called
      // multiple times with `content` being incremental.
      text: ({ content, done }) => {
        // When it's the final content, mark the state as done and ready for the client to access.
        if (done) {
          aiState.done([
            ...aiState.get(),
            {
              role: "assistant",
              content,
            },
          ]);
        }

        return (
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="/gefestAi.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Markdown
              components={{
                code: ({ children }) => (
                  <code className="rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900">
                    {children}
                  </code>
                ),
              }}
              className="prose max-w-full"
            >
              {content}
            </Markdown>
          </div>
        );
      },
      tools: {
        generateQuiz: {
          description:
            "Generate a multiple choice quiz question with possible answers and indicate the correct answer.",
          parameters: z.object({
            question: z.string().describe("The quiz question text"),
            answers: z
              .array(z.string())
              .describe("An array of possible answer choices"),
            correctAnswer: z
              .string()
              .describe("The correct answer to the question"),
          }),
          render: async function* ({ question, answers, correctAnswer }) {
            yield <Skeleton className="h-96 w-full"></Skeleton>;

            aiState.done([
              ...aiState.get(),
              {
                id: nanoid(),
                role: "function",
                name: "generateQuiz",
                content: JSON.stringify({ question, answers, correctAnswer }),
              },
            ]);
            const answersWithId = answers.map((answer, index) => ({
              content: answer,
              answerId: nanoid(),
            }));
            const correctAnswerId =
              answersWithId.find((answer) => answer.content === correctAnswer)
                ?.answerId ?? answersWithId[0].answerId;
            return (
              <Quiz
                questionContent={question}
                answers={answersWithId}
                correctAnswerId={correctAnswerId}
                points={1}
              ></Quiz>
            );
          },
        },
      },
    });

    return {
      id: Date.now(),
      display: ui,
    };
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [
  {
    role: "system",
    content: `Ты учитель программирования. Помогаешь ученикам с HTML, CSS, Javascript`,
  },
];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {},
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
