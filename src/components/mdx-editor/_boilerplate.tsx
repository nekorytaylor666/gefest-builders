import React from "react";
import { LeafDirective } from "mdast-util-directive";
import {
  diffSourcePlugin,
  markdownShortcutPlugin,
  AdmonitionDirectiveDescriptor,
  DirectiveDescriptor,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  SandpackConfig,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  KitchenSinkToolbar,
  jsxPlugin,
  directivesPluginHooks,
  DialogButton,
  BlockTypeSelect,
  ChangeAdmonitionType,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  InsertAdmonition,
  InsertCodeBlock,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  EditorInFocus,
  AdmonitionKind,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
} from "@mdxeditor/editor";
import { Cross1Icon } from "@radix-ui/react-icons";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";

const defaultSnippetContent = `
<html>
    <head>
        <title>Tiêu đề website</title>
    </head>
    <body>
        <p>Chào mừng bạn đến với blog 
          <strong>TraiNguyen.net</strong>.
        </p>
        <p>Đoạn văn bản
          <strong>in đậm đầu tiên</strong>.
        </p>
    </body>
</html>
`.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: "html",
  presets: [
    {
      label: "HTML",
      name: "html",
      meta: "live",
      sandpackTemplate: "static",
      sandpackTheme: "light",
      snippetFileName: "/index.html",
      snippetLanguage: "html",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export async function expressImageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}

interface YoutubeDirectiveNode extends LeafDirective {
  name: "youtube";
  attributes: { id: string };
}

export const YoutubeDirectiveDescriptor: DirectiveDescriptor<YoutubeDirectiveNode> =
  {
    name: "youtube",
    type: "leafDirective",
    testNode(node) {
      return node.name === "youtube";
    },
    attributes: ["id"],
    hasChildren: false,
    Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <button
            onClick={() => {
              parentEditor.update(() => {
                lexicalNode.selectNext();
                lexicalNode.remove();
              });
            }}
          >
            delete
          </button>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      );
    },
  };

interface LoomDirectiveNode extends LeafDirective {
  name: "youtube";
  attributes: { id: string };
}
export const LoomDirectiveDescriptor: DirectiveDescriptor<LoomDirectiveNode> = {
  name: "loom",
  type: "leafDirective",
  testNode(node) {
    return node.name === "loom";
  },
  attributes: ["id"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <>
        <button
          className="flex items-center gap-1"
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          <Cross1Icon></Cross1Icon>
          Убрать видео
        </button>
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={`https://www.loom.com/embed/${mdastNode.attributes?.id}`}
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </>
    );
  },
};

const LoomButton = () => {
  // grab the insertDirective action (a.k.a. publisher) from the
  // state management system of the directivesPlugin
  const insertDirective = directivesPluginHooks.usePublisher("insertDirective");

  return (
    <DialogButton
      tooltipTitle="Insert Loom video"
      submitButtonTitle="Insert video"
      dialogInputPlaceholder="Paste the loom video URL"
      buttonContent="Loom"
      onSubmit={(url: string) => {
        const urlObject = new URL(url);
        const videoId = urlObject.pathname.split("/").pop();
        if (videoId) {
          insertDirective({
            name: "loom",
            type: "leafDirective",
            attributes: { id: videoId },
            children: [],
          } as LeafDirective);
        } else {
          alert("Invalid Loom URL");
        }
      }}
    />
  );
};
function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    (node as any).getMdastNode().name as AdmonitionKind
  );
}

export const ALL_PLUGINS = [
  toolbarPlugin({
    toolbarContents: () => (
      <ConditionalContents
        options={[
          {
            when: (editor) => editor?.editorType === "codeblock",
            contents: () => <ChangeCodeMirrorLanguage />,
          },
          {
            when: (editor) => editor?.editorType === "sandpack",
            contents: () => <ShowSandpackInfo />,
          },
          {
            fallback: () => (
              <>
                <LoomButton></LoomButton>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />

                <ConditionalContents
                  options={[
                    {
                      when: whenInAdmonition,
                      contents: () => <ChangeAdmonitionType />,
                    },
                    { fallback: () => <BlockTypeSelect /> },
                  ]}
                />

                <Separator />

                <CreateLink />
                <InsertImage />

                <Separator />

                <InsertTable />
                <InsertThematicBreak />

                <Separator />
                <InsertCodeBlock />
                {/* <InsertSandpack /> */}

                <ConditionalContents
                  options={[
                    {
                      when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                      contents: () => (
                        <>
                          <Separator />
                          <InsertAdmonition />
                        </>
                      ),
                    },
                  ]}
                />

                <Separator />
              </>
            ),
          },
        ]}
      />
    ),
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
    },
  }),
  directivesPlugin({
    directiveDescriptors: [
      YoutubeDirectiveDescriptor,
      AdmonitionDirectiveDescriptor,
      LoomDirectiveDescriptor,
    ],
  }),
];
