import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Slider,
} from "@nextui-org/react";

function FilterShimmer() {
  return (
    <Accordion defaultExpandedKeys={["1"]}>
      <AccordionItem
        className="lg:hidden"
        indicator={
          <Skeleton className="w-7 h-7 rounded-full">
            <span className="invisible w-full mb-2"> Product Name </span>
          </Skeleton>
        }
        title={
          <div className="flex flex-row justify-between">
            <Skeleton className="rounded-xl">
              <span className="invisible w-full text-3xl lg:text-6xl">
                Product Name{" "}
              </span>
            </Skeleton>
          </div>
        }
      ></AccordionItem>
      <AccordionItem
        className="hidden lg:block"
        key="1"
        indicator={
          <Skeleton className="w-7 h-7 rounded-full">
            <span className="invisible w-full mb-2"> Product Name </span>
          </Skeleton>
        }
        title={
          <div className="flex flex-row justify-between">
            <Skeleton className="rounded-xl">
              <span className="invisible w-full text-3xl lg:text-6xl">
                Product Name{" "}
              </span>
            </Skeleton>
          </div>
        }
      >
        <Card className="bg-white rounded shadow-md">
          <CardBody className="mb-4">
            <div className="mb-6 flex flex-col gap-2">
              <Skeleton className="w-1/2 lg:w-1/3 rounded-xl">
                <span className="invisible w-full mb-2"> Product Name </span>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <span className="invisible w-full text-3xl lg:text-6xl">
                  {" "}
                  Product Name{" "}
                </span>
              </Skeleton>
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <Skeleton className="w-1/2 lg:w-1/3 rounded-xl">
                <span className="invisible w-full mb-2"> Product Name </span>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <span className="invisible w-full text-3xl lg:text-6xl">
                  {" "}
                  Product Name{" "}
                </span>
              </Skeleton>
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <Skeleton className="w-1/2 lg:w-1/3 rounded-xl">
                <span className="invisible w-full mb-2"> Product Name </span>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <span className="invisible w-full text-3xl lg:text-6xl">
                  {" "}
                  Product Name{" "}
                </span>
              </Skeleton>
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <Skeleton className="w-1/2 lg:w-1/3 rounded-xl">
                <span className="invisible w-full mb-2"> Product Name </span>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <span className="invisible w-full text-3xl lg:text-5xl">
                  {" "}
                  Product Name Product Namdita eaque nobis quae id autem
                  recusandae.{" "}
                </span>
              </Skeleton>
            </div>
          </CardBody>

          <CardFooter className="mb-4 flex justify-end gap-5"></CardFooter>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterShimmer;
