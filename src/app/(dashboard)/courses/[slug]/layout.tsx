import LectureNavbar from "@/components/lecture-navbar";
import { NavMenu } from "@/components/navmenu";
import Image from "next/image";
export default function CoursePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="lg:pt-16">{children}</div>
    </section>
  );
}
