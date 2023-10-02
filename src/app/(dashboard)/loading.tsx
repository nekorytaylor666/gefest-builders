import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container max-w-screen-xl pt-20 mx-auto">
      <Skeleton className="w-1/2 h-20"></Skeleton>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="w-full h-[500px] mt-8" />
        <Skeleton className="w-full h-[500px] mt-8" />
        <Skeleton className="w-full h-[500px] mt-8" />
      </div>
    </div>
  );
}
