"use client";
import React, { useEffect } from "react";
import { CoursesPageContainerProps } from "./type";
import CoursesPageView from "./coursesPageView";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCurrentUserStore } from "@/store/currentUserStore";

const CoursesPageContainer = (props: CoursesPageContainerProps) => {
  return <CoursesPageView courses={props.courses}></CoursesPageView>;
};

export default CoursesPageContainer;
