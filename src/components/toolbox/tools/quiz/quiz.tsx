import { useState, useCallback, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import QuizEditor, { QuizEditorValue } from "./quizEditor";
import Editor from "@/components/editor";
import { HiFire } from "react-icons/hi2";

interface QuestionComponentProps {
  question: QuizEditorValue["questionContent"];
  options: QuizEditorValue["answers"];
  selectedOption: string | null;
  setSelectedOption: (value: string) => void;
  isSubmitted: boolean;
  showCorrectAnswer: boolean;
  correctAnswerId: string;
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
  correctAnswerId,
}: QuestionComponentProps) => {
  return (
    <div>
      <Editor className="w-full p-4" readonly defaultValue={question}></Editor>
      <RadioGroup
        onValueChange={(value) => setSelectedOption(value)}
        defaultValue={selectedOption?.toString()}
        className="flex flex-col pt-4"
        disabled={isSubmitted} // Disable the RadioGroup if the answer has been submitted
      >
        {options.map((option, index) => (
          <label
            key={option.answerId}
            className={cn("cursor-pointer", {
              "pointer-events-none": isSubmitted,
            })}
          >
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] gap-2 px-4 py-2 transition-colors ease-in-out duration-250 hover:bg-zinc-200 dark:hover:bg-zinc-500",
                {
                  "dark:bg-zinc-500 bg-zinc-200":
                    (options.find((el) => el.answerId === selectedOption) ===
                      option &&
                      !showCorrectAnswer) ||
                    (showCorrectAnswer && option.answerId === correctAnswerId),
                }
              )}
            >
              <RadioGroupItem
                className="aspect-square"
                value={option.answerId}
                disabled={isSubmitted}
              />
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
      <HiFire className="w-8 h-8 text-orange-600" />
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
  answers,
  correctAnswerId,
  points,
  questionContent,
}: QuizEditorValue) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the answer has been submitted

  const isCorrectAnswer = answers.some(
    (el) => el.answerId === selectedOption && el.answerId === correctAnswerId
  );

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    setShowCorrectAnswer(true);
    setIsSubmitted(true);
  };
  return (
    <div className="my-6 dark:bg-zinc-800 bg-zinc-100 rounded-md w-1/2 mx-auto pb-4">
      <QuestionComponent
        question={questionContent}
        options={answers}
        selectedOption={selectedOption}
        setSelectedOption={handleAnswer}
        isSubmitted={isSubmitted}
        showCorrectAnswer={showCorrectAnswer}
        correctAnswerId={correctAnswerId}
      />
      <FeedbackComponent
        showCorrectAnswer={showCorrectAnswer}
        isCorrectAnswer={isCorrectAnswer}
      />
    </div>
  );
}
