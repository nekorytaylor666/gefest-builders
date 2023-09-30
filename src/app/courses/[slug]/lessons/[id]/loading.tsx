import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="lg:container lg:max-w-screen-md">
      <Skeleton className="w-full h-96" />
    </div>
  );
}
