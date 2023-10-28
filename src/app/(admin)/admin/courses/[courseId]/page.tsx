import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../_components/dashboardHeader";
import { DashboardShell } from "../../_components/dashboardShell";

const CoursePage = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Курс"
        text="Управляйте своим курсом"
      ></DashboardHeader>
    </DashboardShell>
  );
};

export default CoursePage;
