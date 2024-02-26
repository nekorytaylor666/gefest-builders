import { GBlock, GBlockType } from "@/components/toolbox/tools";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GBlockInstance {
  id: string;
  type: GBlockType;
  content: any; // Adjust according to your content structure
}

export interface LessonBlocks {
  [lessonId: string]: GBlockInstance[];
}

interface ContentStoryEditorState {
  lessonsBlocks: LessonBlocks;
  addBlock: (lessonId: string, block: GBlockInstance) => void;
  updateBlock: (lessonId: string, blockId: string, newContent: any) => void;
  removeBlock: (lessonId: string, blockId: string) => void;
  setLessonBlocksForLessonId: (
    lessonId: string,
    blocks: GBlockInstance[]
  ) => void;
}

export const useContentStoryEditorStore = create<ContentStoryEditorState>()(
  persist(
    (set) => ({
      lessonsBlocks: {},
      setLessonBlocksForLessonId: (
        lessonId: string,
        blocks: GBlockInstance[]
      ) => {
        set((state) => ({
          lessonsBlocks: {
            ...state.lessonsBlocks,
            [lessonId]: blocks,
          },
        }));
      },
      addBlock: (lessonId, block) =>
        set((state) => ({
          lessonsBlocks: {
            ...state.lessonsBlocks,
            [lessonId]: [...(state.lessonsBlocks[lessonId] || []), block],
          },
        })),
      updateBlock: (lessonId, blockId, newContent) =>
        set((state) => ({
          lessonsBlocks: {
            ...state.lessonsBlocks,
            [lessonId]: state.lessonsBlocks[lessonId].map((block) =>
              block.id === blockId ? { ...block, content: newContent } : block
            ),
          },
        })),
      removeBlock: (lessonId, blockId) =>
        set((state) => ({
          lessonsBlocks: {
            ...state.lessonsBlocks,
            [lessonId]: state.lessonsBlocks[lessonId].filter(
              (block) => block.id !== blockId
            ),
          },
        })),
    }),
    { name: "contentStoryEditor" }
  )
);
