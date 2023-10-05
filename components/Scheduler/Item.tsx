import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import React from "react";
import { getDateDifferenceInDays } from "./helpers";
import config from "./config";
import SETTINGS from "./constants";

interface ItemProps extends React.HTMLProps<HTMLDivElement> {
  project: Prisma.ProjectGetPayload<{}>;
}

const Item = ({ project, ...props }: ItemProps) => {
  const { className, ...rest } = props;

  //get days between config start and project start
  const startDays = getDateDifferenceInDays(project.startDate!, config.start);

  const durationDays = getDateDifferenceInDays(
    project.startDate!,
    project.endDate!
  );

  return (
    <div
      className={cn(
        "border rounded-md border-neutral-500 bg-neutral-500/50 h-full pl-4 flex items-center font-medium absolute",
        className
      )}
      style={{
        left: startDays * SETTINGS.UNIT_WIDTH + 0.5 * SETTINGS.UNIT_WIDTH,
        width: durationDays * SETTINGS.UNIT_WIDTH,
      }}
      {...rest}
    >
      {project.title} {durationDays}
    </div>
  );
};

export default Item;
