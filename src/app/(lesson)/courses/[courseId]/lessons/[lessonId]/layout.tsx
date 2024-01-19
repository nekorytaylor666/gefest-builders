import LectureNavbar from "@/components/lecture-navbar";
import { MDXProvider } from "@mdx-js/react";

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
