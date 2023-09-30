import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="lg:container lg:max-w-screen-md pt-20">
      <Skeleton className="w-1/2 h-20"></Skeleton>
      <Skeleton className="w-full h-[500px] mt-8" />
    </div>
  );
}
