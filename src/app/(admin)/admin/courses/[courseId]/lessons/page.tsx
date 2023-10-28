import TypographyH1 from "@/components/ui/typography/h1";
import React from "react";
import { DashboardHeader } from "../../../_components/dashboardHeader";
import { DashboardShell } from "../../../_components/dashboardShell";

const LessonsPage = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Уроки"
        text="Управляйте своими уроками курса"
      ></DashboardHeader>
    </DashboardShell>
  );
};

export default LessonsPage;
