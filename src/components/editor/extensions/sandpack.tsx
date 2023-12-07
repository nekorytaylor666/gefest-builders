import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  Sandpack,
} from "@codesandbox/sandpack-react";

const SandpackExtension = Node.create({
  name: "sandpack",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "sandpack",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["sandpack", mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      files: {
        default: {
          "/index.html": {
            code: "<h1>Всем привет</h1>",
          },
        },
      },
      template: {
        default: "static",
      },
    };
  },

  addCommands() {
    return {
      addSandpack:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "sandpack",
            attrs: options,
          });
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-S": () => this.editor.commands.addSandpack(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      console.log(props);
      return (
        <NodeViewWrapper>
          <Sandpack options={{ editorHeight: 800 }} {...props.node.attrs} />
        </NodeViewWrapper>
      );
    });
  },
});

export default SandpackExtension;
