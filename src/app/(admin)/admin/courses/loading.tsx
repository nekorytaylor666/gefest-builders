import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col ">
      <Skeleton className="h-16 w-1/2" />
      <Skeleton className="h-[600px] mt-8 w-full" />
    </div>
  );
};

export default Loading;
