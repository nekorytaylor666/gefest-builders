import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import QuizEditor from "./quizEditor";

interface QuizProps {
  question: string;
  options: { content: string; correct: boolean }[];
  correctAnswer: string;
  onSuccess: () => void;
}

interface QuestionComponentProps {
  question: string;
  options: { content: string; correct: boolean }[];
  selectedOption: number | null;
  setSelectedOption: (value: number) => void;
  isSubmitted: boolean;
  showCorrectAnswer: boolean;
}

interface FeedbackComponentProps {
  showCorrectAnswer: boolean;
  isCorrectAnswer: boolean;
}

interface SubmitButtonComponentProps {
  handleSubmit: () => void;
  isSubmitted: boolean;
}

const QuestionComponent = ({
  question,
  options,
  selectedOption,
  setSelectedOption,
  isSubmitted,
  showCorrectAnswer,
}: QuestionComponentProps) => {
  return (
    <div>
      <div className="p-4 prose w-max">{question}</div>
      <RadioGroup
        onValueChange={(value) => setSelectedOption(Number(value))}
        defaultValue={selectedOption?.toString()}
        className="flex flex-col pt-4"
        disabled={isSubmitted} // Disable the RadioGroup if the answer has been submitted
      >
        {options.map((option, index) => (
          <label
            key={option.content}
            className={cn("cursor-pointer", {
              "pointer-events-none": isSubmitted,
            })}
          >
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] gap-2 px-4 py-2 transition-colors ease-in-out duration-250 hover:bg-zinc-200",
                {
                  "bg-zinc-200":
                    (options[selectedOption as number] === option &&
                      !showCorrectAnswer) ||
                    (showCorrectAnswer && option.correct),
                }
              )}
            >
              <RadioGroupItem
                className="aspect-square"
                value={index.toString()}
                disabled={isSubmitted}
              />{" "}
              {/* Disable individual items if submitted */}
              <div className="font-normal">{option.content}</div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

const FeedbackComponent = ({
  showCorrectAnswer,
  isCorrectAnswer,
}: FeedbackComponentProps) => {
  if (!showCorrectAnswer) return null;
  const correctAnswerComponent = () => (
    <div className="flex items-center gap-1 ">
      <Flame className="w-8 h-8 text-orange-500" />
      <span className="font-bold">Правильно</span>
    </div>
  );
  const incorrectAnswerComponent = () => (
    <div className="font-bold">Неправильно</div>
  );

  return (
    <div className="px-4 py-2">
      {isCorrectAnswer ? correctAnswerComponent() : incorrectAnswerComponent()}
    </div>
  );
};

const SubmitButtonComponent = ({
  handleSubmit,
  isSubmitted,
}: SubmitButtonComponentProps) => {
  return (
    <div className="p-4 space-y-2">
      <Button onClick={handleSubmit} disabled={isSubmitted}>
        Ответить
      </Button>
      {/* Disable the submit button if submitted */}
    </div>
  );
};

export function Quiz({
  question,
  options,
  correctAnswer,
  onSuccess,
}: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the answer has been submitted

  const isCorrectAnswer =
    selectedOption !== null ? options[selectedOption].correct : false;

  const handleSubmit = useCallback(() => {
    setShowCorrectAnswer(true);
    setIsSubmitted(true); // Mark as submitted
    if (isCorrectAnswer) {
      onSuccess();
    }
  }, [isCorrectAnswer, onSuccess]);
  return <QuizEditor></QuizEditor>;
  // return (
  //   // <div className="my-6 bg-zinc-100 rounded-md w-full max-w-4xl">
  //   {
  //     /* <QuestionComponent
  //       question={question}
  //       options={options}
  //       selectedOption={selectedOption}
  //       setSelectedOption={setSelectedOption}
  //       isSubmitted={isSubmitted}
  //       showCorrectAnswer={showCorrectAnswer}
  //     />
  //     <FeedbackComponent
  //       showCorrectAnswer={showCorrectAnswer}
  //       isCorrectAnswer={isCorrectAnswer}
  //     />
  //     <SubmitButtonComponent
  //       handleSubmit={handleSubmit}
  //       isSubmitted={isSubmitted}
  //     /> */
  //   }
  // );
}
