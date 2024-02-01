// @ts-ignore
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  Sandpack,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import SandpackAddForm from "./sandpackAddForm";
import { Card, CardContent } from "@/components/ui/card";

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
      sandpackAttr: {
        default: {
          files: {},
          template: "static",
        },
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
      const handleFilesUpload = ({ files, template }) => {
        console.log("files:", Object.entries(files)[0][1].code);
        updateAttributes({
          isFilesUploaded: true,
          sandpackAttr: {
            files: {
              "index.js": Object.entries(files)[0][1].code,
            },
            template,
            options: {
              layout: "console",
            },
          },
        });
      };

      return (
        <NodeViewWrapper as={"div"}>
          {node.attrs.isFilesUploaded ? (
            <Sandpack
              options={{ editorHeight: 600 }}
              theme={"auto"}
              {...node.attrs.sandpackAttr}
            ></Sandpack>
          ) : (
            <Card>
              <CardContent className=" h-52 w-full ">
                <SandpackAddForm onSubmit={handleFilesUpload}></SandpackAddForm>
              </CardContent>
            </Card>
          )}
        </NodeViewWrapper>
      );
    });
  },
});

export default SandpackExtension;
