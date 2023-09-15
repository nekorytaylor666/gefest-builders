"use client";
import Image from "next/image";
import Rive, { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState, useEffect, useCallback } from "react";
import TypographyP from "@/components/ui/typography/p";
import CourseMilestoneNodeButton from "./components/courseMilestoneNode";
import CourseMilestoneMap from "./components/courseMilestoneMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypographyH1 from "@/components/ui/typography/h1";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/h2";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="grid grid-cols-1 items-start lg:grid-cols-5 container max-w-6xl p-0">
      <div className="p-4 lg:col-span-2">
        <Card>
          <CardHeader>
            <TypographyH2>2.1 Programming with Python</TypographyH2>
            <CardDescription>
              Learn one of the most in-demand programming languages the fun way.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>19 Lessons</p>
          </CardContent>
          <CardFooter>
            <Button>Start</Button>
          </CardFooter>
        </Card>
      </div>

      <ScrollArea className="lg:h-[calc(100vh-100px)] scroll-smooth lg:col-start-3 lg:col-span-3">
        <CourseMilestoneMap></CourseMilestoneMap>
      </ScrollArea>
    </div>
  );
}
