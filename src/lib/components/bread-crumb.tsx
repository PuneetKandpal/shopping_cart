"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import GeneralHelperInstance from "../helpers/general.helper";

function BreadCrumb() {
  const pathname = usePathname();
  const router = useRouter();

  let pathNameArray = pathname.split("/");
  pathNameArray.shift(); // remove empty string

  function getLink(urlSegment: string) {
    return pathname.split(urlSegment)[0] + urlSegment || "/"; // home route as fallback
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem 
        className="text-xl"
        onClick={() => router.push("/")}>Home</BreadcrumbItem>
        {pathNameArray.map((item, index) => (
          <BreadcrumbItem
            key={index}
            className="text-xl"
            onClick={() => router.push(getLink(item))}
          >
            {GeneralHelperInstance.capitalize(item)}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumb;
