"use client";
import React from "react";
import CourseMilestoneNodeButton from "./courseMilestoneNode";
import { Lesson } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CourseData } from "@/components/pages/coursePage/type";

interface Props {
  lessons: Lesson[];
  courseId: number;
  finishedLessons: any;
}
const AMOUNT_LESSONS_ON_PATTERN = 5;

const CourseMilestoneMap = (props: Props) => {
  const lessons = props.lessons;
  const courseId = props.courseId;

  const chunkedLessons = React.useMemo(() => {
    const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
    const result = [];
    for (let i = 0; i < sortedLessons.length; i += AMOUNT_LESSONS_ON_PATTERN) {
      result.push(sortedLessons.slice(i, i + AMOUNT_LESSONS_ON_PATTERN));
    }
    return result;
  }, [lessons]);

  return (
    <div className="lesson-map-container  w-full max-w-[700px] mx-auto">
      {chunkedLessons.map((el) => (
        <CourseMilestonePattern
          key={0}
          cursor={0}
          courseId={courseId}
          lessons={el}
          finishedLessons={props.finishedLessons}
        ></CourseMilestonePattern>
      ))}
    </div>
  );
};

const CourseMilestonePattern = (props: {
  cursor: number;
  courseId: number;
  lessons: Lesson[];
  finishedLessons: any;
}) => {
  const router = useRouter();
  const start = props.cursor * AMOUNT_LESSONS_ON_PATTERN;
  const end = start + AMOUNT_LESSONS_ON_PATTERN;
  const lessonsToRender = props.lessons.slice(start, end);
  return (
    <div className="w-full overflow-x-hidden h-[650px] pt-10">
      <div className="grid grid-cols-3 grid-rows-5 h-[500px] w-[320px]  mx-auto ">
        <div className="relative row-start-1 col-start-1 col-span-3 row-span-2  bottom-6">
          <svg
            viewBox="0 0 454 160"
            focusable="false"
            className="chakra-icon css-tm6kk8 absolute left-[-54px] stroke-gray-300"
          >
            <path
              d="M194.5 27L152.992 2.19083C151.76 1.45444 150.228 1.43462 148.978 2.13888L54.1875 55.5158C51.4715 57.0452 51.4709 60.9558 54.1865 62.486L167.882 126.553C170.583 128.074 170.601 131.957 167.914 133.504L124.5 158.5"
              strokeWidth="2"
            ></path>
          </svg>
          <div className="w-full flex justify-center">
            <CourseMilestoneNodeButton
              completed={
                !!props.finishedLessons.find(
                  ({ lessonId }: any) => lessonId === lessonsToRender[0]?.id
                )
              }
              onClick={function (): void {
                router.push(
                  "/courses/" +
                    props.courseId +
                    "/lessons/" +
                    lessonsToRender[0].id
                );
              }}
              label={lessonsToRender[0]?.title}
            ></CourseMilestoneNodeButton>
          </div>
        </div>
        <div className="row-start-2 col-start-1 col-span-3 row-span-2 items-center  self-center content-center relative w-full">
          <svg
            viewBox="0 0 228 263"
            focusable="false"
            className="chakra-icon css-1lj00nd absolute stroke-gray-300 "
            style={{
              top: "34px",
              left: "-61px",
              zIndex: -1,
            }}
          >
            <path
              d="M124 1.5L10.4044 68.5038C7.76628 70.0599 7.78428 73.8823 10.4369 75.4134L168.977 166.927C170.227 167.648 171.769 167.64 173.011 166.906L227 135"
              stroke-width="2"
            ></path>
          </svg>
          <div className="flex items-end relative bottom-4 left-4">
            <CourseMilestoneNodeButton
              completed={
                !!props.finishedLessons.find(
                  ({ lessonId }: any) => lessonId === lessonsToRender[1]?.id
                )
              }
              onClick={function (): void {
                router.push(
                  "/courses/" +
                    props.courseId +
                    "/lessons/" +
                    lessonsToRender[1].id
                );
              }}
              label={lessonsToRender[1]?.title}
            ></CourseMilestoneNodeButton>
          </div>
        </div>

        <div className=" row-start-3 col-start-2 row-span-2 self-center relative">
          <div className="relative top-4">
            <CourseMilestoneNodeButton
              completed={
                !!props.finishedLessons.find(
                  ({ lessonId }: any) => lessonId === lessonsToRender[2]?.id
                )
              }
              onClick={function (): void {
                router.push(
                  "/courses/" +
                    props.courseId +
                    "/lessons/" +
                    lessonsToRender[2].id
                );
              }}
              label={lessonsToRender[2]?.title}
            ></CourseMilestoneNodeButton>
          </div>
          <svg
            viewBox="0 0 228 263"
            focusable="false"
            className="chakra-icon css-1bcz88j absolute stroke-gray-300"
            style={{
              top: "-73px",
              left: "64px",
              zIndex: -1,
            }}
          >
            <path
              d="M1.5 133.5L62.4395 97.7102C63.7085 96.9648 65.2844 96.9766 66.5422 97.7408L216.79 189.03C219.373 190.6 219.349 194.359 216.744 195.894L105.5 261.5"
              stroke-width="2"
            ></path>
          </svg>
        </div>
        <div className=" row-start-5 col-start-1 col-span-3 row-span-2 justify-self-end self-center relative">
          <svg
            viewBox="0 0 454 126"
            focusable="false"
            className="chakra-icon css-z7sfse absolute stroke-gray-300"
            style={{
              top: "52px",
              right: "-63px",
            }}
          >
            <path
              d="M331 1.5L179.357 90.5601C176.728 92.1041 176.724 95.9035 179.349 97.4536L226 125"
              stroke-width="2"
            ></path>
          </svg>
          <div className="relative ">
            <CourseMilestoneNodeButton
              completed={
                !!props.finishedLessons.find(
                  ({ lessonId }: any) => lessonId === lessonsToRender[3]?.id
                )
              }
              onClick={function (): void {
                router.push(
                  "/courses/" +
                    props.courseId +
                    "/lessons/" +
                    lessonsToRender[3].id
                );
              }}
              label={lessonsToRender[3]?.title}
            ></CourseMilestoneNodeButton>
          </div>{" "}
        </div>
        <div className=" row-start-7 col-start-1 col-span-3 row-span-2 justify-self-center self-center relative">
          <div className="relative top-8">
            <CourseMilestoneNodeButton
              completed={
                !!props.finishedLessons.find(
                  ({ lessonId }: any) => lessonId === lessonsToRender[4]?.id
                )
              }
              onClick={function (): void {
                router.push(
                  "/courses/" +
                    props.courseId +
                    "/lessons/" +
                    lessonsToRender[4].id
                );
              }}
              label={lessonsToRender[4]?.title}
            ></CourseMilestoneNodeButton>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CourseMilestoneMap;
