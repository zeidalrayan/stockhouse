import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <Card
      className=" space-y-5 p-4  rounded-2xl w-72 text-center flex flex-col gap gap-6 py-4"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-11 w-6 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-full rounded-lg">
          <div className="h-6 w-3/5 rounded-lg pb-7 bg-default-200"></div>
        </Skeleton>

        <Skeleton className="w-full rounded-lg">
          <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
