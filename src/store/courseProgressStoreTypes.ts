// types.d.ts or another appropriate file

export type Progress = {
  totalBlocks: number;
  completedBlocks: number;
};

export type LessonProgress = {
  [lessonId: string]: Progress;
};

export type CourseProgress = {
  [courseId: string]: LessonProgress;
};

export type UserProgress = {
  [userId: string]: CourseProgress;
};
