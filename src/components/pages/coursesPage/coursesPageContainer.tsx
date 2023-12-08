"use client";
import React, { useEffect } from "react";
import { CoursesPageContainerProps } from "./type";
import CoursesPageView from "./coursesPageView";

const CoursesPageContainer = (props: CoursesPageContainerProps) => {
  return <CoursesPageView courses={props.courses}></CoursesPageView>;
};

export default CoursesPageContainer;
