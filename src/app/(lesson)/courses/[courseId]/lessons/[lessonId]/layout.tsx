import LectureNavbar from "@/components/lecture-navbar";
import { MDXProvider } from "@mdx-js/react";
import { AI } from "./action";

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
