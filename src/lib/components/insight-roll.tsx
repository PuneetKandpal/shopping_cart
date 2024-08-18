import React from "react";

const InsightRoll = ({ insights }: { insights: string[] }) => {
  return (
    <div className="w-full bg-blue-400/30 text-light dark:text-dark whitespace-nowrap overflow-hidden">
      <div className="animate-roll  w-full py-1 flex items-center justify-center  font-semibold tracking-wider text-sm md:text-base">
        {insights.map((text, index) => (
          <div key={index}>
            {text} <span className="px-4">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightRoll;
