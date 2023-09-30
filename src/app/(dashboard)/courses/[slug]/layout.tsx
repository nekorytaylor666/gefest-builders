import LectureNavbar from "@/components/lecture-navbar";
import { NavMenu } from "@/components/navmenu";
import Image from "next/image";
//@ts-ignore
import riveWasmUrl from "@rive-app/canvas/rive.wasm";
import { RuntimeLoader } from "@rive-app/react-canvas";
RuntimeLoader.setWasmUrl(riveWasmUrl);

export default function CoursePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="pt-16">{children}</div>
    </section>
  );
}
