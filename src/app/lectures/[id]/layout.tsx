import LectureNavbar from "@/components/lecture-navbar";
import { NavMenu } from "@/components/navbar";
import Image from "next/image";

export default function CoursePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="fixed top-0 z-50 bg-white flex items-center justify-between w-full py-4 px-16">
        <Image
          className="hidden lg:block "
          width={150}
          height={47}
          src={"/logo.svg"}
          alt="logo"
        ></Image>
        <NavMenu></NavMenu>
      </div>
      <div className="pt-16">{children}</div>
    </section>
  );
}
