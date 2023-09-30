import LectureNavbar from "@/components/lecture-navbar";
import { MDXProvider } from "@mdx-js/react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
