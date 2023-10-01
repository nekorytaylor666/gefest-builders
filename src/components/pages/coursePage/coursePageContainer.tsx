"use client";
import { serverClient } from "@/app/_trpc/serverClient";
import CoursePageView from "./coursePageView";
import { CoursePageProps } from "./type";
import { useEffect } from "react";
import useCourseProgressStore from "@/store/courseProgressStore";
import { useUser } from "@auth0/nextjs-auth0/client";

const CoursePageContainer = (props: CoursePageProps) => {
  const { course } = props;

  return <CoursePageView course={course}></CoursePageView>;
};

export default CoursePageContainer;
