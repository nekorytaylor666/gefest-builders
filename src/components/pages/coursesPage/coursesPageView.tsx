import React from "react";
import TypographyH1 from "@/components/ui/typography/h1";

import { CoursesPageViewProps } from "./type";

import { CourseCard } from "./_components/courseCard";

const CoursesPageView = (props: CoursesPageViewProps) => {
  const { courses } = props;
  return (
    <main className="container py-12 max-w-screen-xl">
      <TypographyH1>Что ты хочешь узнать сегодня?</TypographyH1>
      <section className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CoursesPageView;
