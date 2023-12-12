import { FileIcon } from "@radix-ui/react-icons";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

const DownloadFileExtension = Node.create({
  name: "downloadFile",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "downloadFile",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["downloadFile", mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      fileUrl: {
        default: "",
      },
      fileName: {
        default: "",
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer((props: any) => {
      const { node } = props;

      return (
        <NodeViewWrapper contenteditable="false">
          <a
            className="cursor-pointer"
            target="_blank"
            href={node.attrs.fileUrl}
            download={node.attrs.fileName}
          >
            <div className="flex items-center gap-2 w-full p-4 border border-zinc-200 rounded-lg">
              <FileIcon className="w-6 h-6"></FileIcon>
              {node.attrs.fileName}
            </div>
          </a>
        </NodeViewWrapper>
      );
    });
  },
});

export default DownloadFileExtension;
