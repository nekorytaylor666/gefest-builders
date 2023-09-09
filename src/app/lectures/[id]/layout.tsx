import LectureNavbar from "@/components/lecture-navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LectureNavbar></LectureNavbar>

      <div>{children}</div>
    </section>
  );
}
