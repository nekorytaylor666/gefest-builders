import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TypographyInlineCode from "./ui/typography/code";
import { cn } from "@/lib/utils";

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onSuccess: () => void;
}

export function Quiz({
  question,
  options,
  correctAnswer,
  onSuccess,
}: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === correctAnswer) {
      onSuccess();
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
    }
  };

  return (
    <div className=" my-6 bg-gray-100 rounded-md">
      <div className="text-lg pt-4 px-4">{question}</div>
      <RadioGroup
        onValueChange={setSelectedOption}
        defaultValue={selectedOption ?? ""}
        className="flex flex-col pt-4"
      >
        {options.map((option, index) => (
          <label key={option} className="cursor-pointer">
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 space-y-0 px-4 py-2",
                selectedOption === option && "bg-gray-200"
              )}
            >
              <RadioGroupItem value={option} />
              <div className="font-normal">{option}</div>
            </div>
          </label>
        ))}
      </RadioGroup>
      <div className="p-4">
        {showCorrectAnswer && (
          <div className="text-red-500 pb-2">
            Правильный ответ: {correctAnswer}
          </div>
        )}
        <Button onClick={handleSubmit}>Ответить</Button>
      </div>
    </div>
  );
}
