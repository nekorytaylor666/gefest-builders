import LectureNavbar from "@/components/lecture-navbar";
import Navbar from "@/components/navbar/navbar";
import { MDXProvider } from "@mdx-js/react";

export default function HomeworkLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-8">{children}</div>
    </div>
  );
}
