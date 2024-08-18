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
        <div className="relative flex overflow-hidden w-full pb-2 z-0 justify-center">
          <Skeleton className=" w-[300px] duration-1000 md:w-[380px] h-[300px] md:h-[380px]  rounded-xl max-w-full" />
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex-col w-full items-start">
          <Skeleton className="text-sm mb-1 uppercase font-semibold text-slate-700/80">
            <span className="invisible">FamilyName FamilyName FamilyName </span>
          </Skeleton>
          <Skeleton className="font-bold text-2xl mb-1">
            <span className="invisible">product name</span>
          </Skeleton>
          <div className="pt-2 pb-4 w-full flex items-center justify-between">
            <Skeleton className="font-bold text-2xl w-full">
              <span className="invisible">product name</span>
            </Skeleton>
          </div>
          <span className="text-2xl font-bold text-slate-900">
            <Skeleton className="w-full">
              <span className="invisible w-full">
                {" "}
                voluptatum am minima voluptate sed expedita.
              </span>
            </Skeleton>
          </span>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ProductCardShimmer;
