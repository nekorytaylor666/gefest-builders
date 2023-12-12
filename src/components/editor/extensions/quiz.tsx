import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import QuizForm from "./quizform";

const QuizExtension = Node.create({
  name: "quiz",

  group: "block",

  content: "block*",

  parseHTML() {
    return [
      {
        tag: "quiz",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["quiz", mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      question: {
        default: "",
      },
      options: {
        default: [],
      },
      correctAnswer: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      addQuiz:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "quiz",
            attrs: options,
          });
        },
      updateQuiz:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes({
            type: "quiz",
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      const { node, updateAttributes } = props;

      const handleFormSubmit = (data) => {
        updateAttributes(data);
      };

      return <QuizForm onFormSubmit={handleFormSubmit}></QuizForm>;
    });
  },
});

export default QuizExtension;
