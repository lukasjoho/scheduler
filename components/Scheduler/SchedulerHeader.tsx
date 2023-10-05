import React from "react";
import {
  getDatesBetween,
  getMonthName,
  groupDatesByMonth,
  isToday,
} from "./helpers";
import { cn } from "@/lib/utils";
import { Config } from "./config";

interface SchedulerHeaderProps {
  config: Config;
}

const SchedulerHeader = ({ config }: SchedulerHeaderProps) => {
  const dates = getDatesBetween(config.start, config.end);
  const months = groupDatesByMonth(dates);

  return (
    <div className="flex h-16 w-full">
      {months.map((month, idx) => (
        <div key={idx}>
          <div className="text-sm text-muted-foreground border-b h-8 flex items-center">
            {getMonthName(month[0])}
          </div>
          <div className="flex border-b">
            {month.map((date: any, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-8 aspect-square grid place-items-center text-xs text-muted-foreground",
                  isToday(date) &&
                    "bg-red-500 text-foreground font-medium rounded-lg"
                )}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchedulerHeader;
