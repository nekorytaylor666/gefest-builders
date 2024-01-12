import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Skeleton className="w-full h-[575px] mt-8 col-span-2 " />
        <Skeleton className="w-full h-[1500px] mt-8 col-span-3" />
      </div>
    </div>
  );
}
