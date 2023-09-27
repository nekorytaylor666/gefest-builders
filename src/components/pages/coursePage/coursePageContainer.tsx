"use client";
import { serverClient } from "@/app/_trpc/serverClient";
import CoursePageView from "./coursePageView";
import { CoursePageProps } from "./type";
import { useEffect } from "react";
import useCourseProgressStore from "@/store/courseProgressStore";
import { useUser } from "@auth0/nextjs-auth0/client";

const CoursePageContainer = (props: CoursePageProps) => {
  // const { user, isLoading: isUserLoading } = useUser();
  const { courseDataWithUserProgress } = props;
  const {
    userProgress,
    addOrUpdateUserLessonProgress,
    completeBlock,
    getLessonProgress,
    isLessonCompleted,
  } = useCourseProgressStore();

  const user = "testid";
  const courseId = courseDataWithUserProgress?.course?.slug ?? "test";
  const lessonId =
    courseDataWithUserProgress?.lessons[0].courseId.toString() ?? "test";

  useEffect(() => {
    if (!userProgress[user]?.[courseId]?.[lessonId]) {
      addOrUpdateUserLessonProgress(user, courseId, lessonId, 10); // Assuming 10 blocks for this lesson
    }
  }, [courseId, lessonId, userProgress, user, addOrUpdateUserLessonProgress]);

  return (
    <CoursePageView
      course={courseDataWithUserProgress?.course}
    ></CoursePageView>
  );
};

export default CoursePageContainer;
