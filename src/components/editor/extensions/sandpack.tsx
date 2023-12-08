import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  Sandpack,
} from "@codesandbox/sandpack-react";
import SandpackAddForm from "./sandpackAddForm";

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
        default: {},
      },
      template: {
        default: "static",
      },
      isFilesUploaded: {
        default: false,
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
      updateSandpack:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes({
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
      const { node, updateAttributes } = props;
      const handleFilesUpload = (files) => {
        console.log({ files });
        updateAttributes({ files, isFilesUploaded: true });
      };

      return (
        <NodeViewWrapper>
          {node.attrs.isFilesUploaded ? (
            <Sandpack options={{ editorHeight: 800 }} {...node.attrs} />
          ) : (
            <div className="border-2 h-52 w-full bg-zinc-200">
              <SandpackAddForm onSubmit={handleFilesUpload}></SandpackAddForm>
            </div>
          )}
        </NodeViewWrapper>
      );
    });
  },
});

export default SandpackExtension;
