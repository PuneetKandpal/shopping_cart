import React from "react";
import BreadCrumb from "./bread-crumb";

type titleBarProps = {
  title: string;
  subtitle?: string;
  showBreadCrumb?: boolean;
};

function TitleBar({ title, subtitle, showBreadCrumb = true }: titleBarProps) {
  return (
    <div>
      {showBreadCrumb && <BreadCrumb />}
      <div
        className={
          "font-bold text-gray-800 text-4xl  tracking-tight text-left w-full"
        }
      >
        {title}
      </div>
      {subtitle ? (
        <div className="h-2 my-8 text-sm font-normal tracking-widest text-center text-secondary max-w-[400px]">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

export default TitleBar;
