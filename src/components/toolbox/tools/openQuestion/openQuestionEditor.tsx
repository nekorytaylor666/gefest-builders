import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const OpenQuestionEditor = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Открытый вопрос</CardTitle>
        <CardDescription>Вставьте открытый вопрос в это поле</CardDescription>
      </CardHeader>
      <CardContent>
        <Editor
          defaultValue={value}
          onDebouncedUpdate={(editor) => {
            if (!editor) return;
            const html = editor.getHTML();
            onValueChange(html);
          }}
          debounceDuration={500}
        ></Editor>
      </CardContent>
    </Card>
  );
};

export default OpenQuestionEditor;
