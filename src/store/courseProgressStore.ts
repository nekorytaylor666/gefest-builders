// stores/courseProgressStore.js

import { create } from "zustand";
import { produce } from "immer";
import { UserProgress } from "./courseProgressStoreTypes";

type CourseProgressState = {
  userProgress: UserProgress;
  addOrUpdateUserLessonProgress: (
    userId: string,
    courseId: string,
    lessonId: string,
    totalBlocks: number,
    completedBlocks?: number
  ) => void;
  completeBlock: (userId: string, courseId: string, lessonId: string) => void;

  // Here, we include the state as the first argument to the selectors
  getLessonProgress: (
    state: UserProgress,
    userId: string,
    courseId: string,
    lessonId: string
  ) => number;
  isLessonCompleted: (
    state: UserProgress,
    userId: string,
    courseId: string,
    lessonId: string
  ) => boolean;
};

const initialState = {
  userProgress: {}, // { userId: { courseId: { lessonId: { totalBlocks, completedBlocks } } } }
};

const useCourseProgressStore = create<CourseProgressState>((set) => ({
  ...initialState,

  // Add or update progress for a user for a specific lesson within a course
  addOrUpdateUserLessonProgress: (
    userId,
    courseId,
    lessonId,
    totalBlocks,
    completedBlocks = 0
  ) =>
    set(
      produce((draft) => {
        if (!draft.userProgress[userId]) {
          draft.userProgress[userId] = {};
        }
        if (!draft.userProgress[userId][courseId]) {
          draft.userProgress[userId][courseId] = {};
        }
        draft.userProgress[userId][courseId][lessonId] = {
          totalBlocks,
          completedBlocks,
        };
      })
    ),

  // Mark a block as completed for a specific user, lesson, and course
  completeBlock: (userId, courseId, lessonId) =>
    set(
      produce((draft) => {
        const lessonProgress =
          draft.userProgress[userId]?.[courseId]?.[lessonId];
        if (lessonProgress) {
          lessonProgress.completedBlocks += 1;
        }
      })
    ),

  // Fetch progress percentage for a user for a specific lesson and course
  getLessonProgress: (userProgress, userId, courseId, lessonId) => {
    const lesson = userProgress[userId]?.[courseId]?.[lessonId];
    if (!lesson) return 0;
    return (lesson.completedBlocks / lesson.totalBlocks) * 100;
  },

  // Check if a lesson is completed for a user
  isLessonCompleted: (userProgress, userId, courseId, lessonId) => {
    const lesson = userProgress[userId]?.[courseId]?.[lessonId];
    return lesson && lesson.completedBlocks === lesson.totalBlocks;
  },
}));

export default useCourseProgressStore;
