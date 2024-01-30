import React from "react";
import TypographyH1 from "@/components/ui/typography/h1";

import { CoursesPageViewProps } from "./type";

import { CourseCard } from "./_components/courseCard";
import TypographyH3 from "@/components/ui/typography/h3";
import { cva } from "class-variance-authority";
import { Activity } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import LeaderboardTable from "./_components/leaderbordTable";

const CoursesPageView = (props: CoursesPageViewProps) => {
  const { courses } = props;
  return (
    <main className="container pt-12 max-w-screen-xl">
      <TypographyH1>Что ты хочешь узнать сегодня?</TypographyH1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div></div>
        <LeaderboardTable></LeaderboardTable>
      </div>
      <section className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
};

const StreakView = (props: { activities: Activity[] }) => {
  return (
    <div>
      <TypographyH3>Вы в ударе!</TypographyH3>
      <div className="flex items-center gap-2 mt-4">
        {props.activities.map((el) => (
          <StreakItem isActive={el} key={el}></StreakItem>
        ))}
      </div>
    </div>
  );
};

const StreakItem = ({ isActive }: any) => {
  const variant = isActive ? "active" : "default";
  const containerClass = cva(
    "flex flex-col gap-2 p-2 rounded-md  min-w-fit w-0 shadow border",
    {
      variants: {
        variant: {
          default: "",
          active: "border-accent",
        },
      },
    }
  );
  const boxClass = cva("w-10 h-10  rounded-md", {
    variants: {
      variant: {
        default: "bg-zinc-300",
        active: "bg-accent",
      },
    },
  });
  return (
    <div
      className={containerClass({
        variant,
        className: "",
      })}
    >
      <span className="font-bold text-3xl text-center">П</span>
      <div className={boxClass({ variant })}></div>
    </div>
  );
};

export default CoursesPageView;
