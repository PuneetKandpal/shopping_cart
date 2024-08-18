import { Card, CardHeader, cn, Skeleton } from "@nextui-org/react";
import React from "react";

function ProductCardShimmer() {
  return (
    <div
      className={cn(
        "group z-0 flex gap-16 w-[22rem] lg:w-[26rem] transition-all duration-300  rounded-lg"
      )}
    >
      <Card className="py-4 shadow-slate-400/60 rounded-md shadow-md ">
        <div className="relative flex overflow-hidden w-full p-2 z-0 justify-center">
          <Skeleton className=" w-[300px] h-[300px] md:w-[380px]  md:h-[380px]  rounded-xl max-w-full" />
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex-col w-full items-start">
          <Skeleton className="font-bold text-2xl mb-1 rounded-xl">
            <span className="invisible">product name</span>
          </Skeleton>
          <Skeleton className="font-bold text-2xl mb-1 w-full rounded-xl">
            <span className="invisible">product</span>
          </Skeleton>
          <Skeleton className="font-bold text-2xl mb-3 w-full rounded-xl">
            <span className="invisible">product</span>
          </Skeleton>

          <Skeleton className="w-full rounded-xl">
            <span className="invisible w-full text-4xl">voluptatum</span>
          </Skeleton>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ProductCardShimmer;
