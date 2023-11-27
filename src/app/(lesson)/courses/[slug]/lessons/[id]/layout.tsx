import LectureNavbar from "@/components/lecture-navbar";
import { MDXProvider } from "@mdx-js/react";
import "@code-hike/mdx/styles";

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Gefest Builders</title>
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
