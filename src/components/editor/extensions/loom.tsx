import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";

// Импортируйте или определите свои функции для Loom здесь
import {
  getEmbedUrlFromLoomUrl,
  isValidLoomUrl,
  LOOM_REGEX_GLOBAL,
} from "./loom-utils";

export interface LoomOptions {
  // Определите свои опции здесь
  addPasteHandler: boolean;
  allowFullscreen: boolean;
  autoplay: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls: boolean;
  disableKBcontrols: boolean;
  enableIFrameApi: boolean;
  endTime: number;
  height: number;
  interfaceLanguage?: string;
  ivLoadPolicy: number;
  loop: boolean;
  modestBranding: boolean;
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  nocookie: boolean;
  origin: string;
  playlist: string;
  progressBarColor?: string;
  width: number;
}

type SetLoomVideoOptions = {
  src: string;
  width?: number;
  height?: number;
  start?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    loom: {
      /**
       * Insert a loom video
       */
      setLoomVideo: (options: SetLoomVideoOptions) => ReturnType;
    };
  }
}

export const Loom = Node.create<LoomOptions>({
  name: "loom",
  addOptions() {
    return {
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 480,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: 640,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-youtube-video] iframe",
      },
    ];
  },
  // Определите свои методы здесь, аналогично расширению Youtube

  addCommands() {
    return {
      setLoomVideo:
        (options: SetLoomVideoOptions) =>
        ({ commands }) => {
          if (!isValidLoomUrl(options.src)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: LOOM_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromLoomUrl(HTMLAttributes.src);

    HTMLAttributes.src = embedUrl;

    return [
      "div",
      {
        "data-loom-video": "",
        class: "aspect-video rounded-lg overflow-hidden bg-zinc-300",
        style: "position: relative; padding-bottom: 56.25%; height: 0;",
      },
      [
        "iframe",
        mergeAttributes(
          {},
          {
            allowfullscreen: true,
            autoplay: true,
            style:
              "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
          },
          HTMLAttributes
        ),
      ],
    ];
  },
});
