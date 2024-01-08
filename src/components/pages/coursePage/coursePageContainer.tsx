"use client";
import { serverClient } from "@/app/_trpc/serverClient";
import CoursePageView from "./coursePageView";
import { CoursePageProps } from "./type";
import { useEffect } from "react";
import useCourseProgressStore from "@/store/courseProgressStore";

const CoursePageContainer = (props: CoursePageProps) => {
  const { course } = props;

  return <CoursePageView course={course}></CoursePageView>;
};

export default CoursePageContainer;
