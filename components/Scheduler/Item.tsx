"use client";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import React, { useCallback, useRef } from "react";
import {
  convertToNearestMultiple,
  getDateDifferenceInDays,
  roundToNearestMultiple,
} from "./helpers";
import config from "./config";
import SETTINGS from "./constants";
import { motion, useMotionValue } from "framer-motion";
import { updateProject } from "@/lib/actions";
import toast from "react-hot-toast";

interface ItemProps extends React.HTMLProps<HTMLDivElement> {
  project: Prisma.ProjectGetPayload<{}>;
}

const Item = ({ project, ...props }: ItemProps) => {
  const { className, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);

  //get days between config start and project start
  const startDays = getDateDifferenceInDays(project.startDate!, config.start);

  const durationDays = getDateDifferenceInDays(
    project.startDate!,
    project.endDate!
  );

  const mWidth = useMotionValue(durationDays * SETTINGS.UNIT_WIDTH);
  const mPos = useMotionValue(
    startDays * SETTINGS.UNIT_WIDTH + 0.5 * SETTINGS.UNIT_WIDTH
  );

  function snapPosition(number: number) {
    const newPos = roundToNearestMultiple(number);
    mPos.set(newPos);
    return newPos;
  }

  function getDateFromPosition(position: number) {
    const days = position / SETTINGS.UNIT_WIDTH;
    const date = new Date(config.start);
    date.setDate(date.getDate() + days);
    return date;
  }

  const handleDrag = useCallback(
    (event: any, info: any, position: "left" | "center" | "right") => {
      if (position === "left") {
        let newWidth = mWidth.get() - info.delta.x;

        let newPosition = mPos.get() + info.delta.x;
        mPos.set(newPosition);
        mWidth.set(newWidth);
      }
      if (position === "right") {
        let newWidth = mWidth.get() + info.delta.x;
        mWidth.set(newWidth);
      }
      if (position === "center") {
        let newPosition = mPos.get() + info.delta.x;
        mPos.set(newPosition);
      }
    },
    []
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "border rounded-md border-neutral-500 bg-neutral-500/50 h-full pl-4 flex items-center font-medium absolute whitespace-nowrap",
        className
      )}
      style={{
        left: 0,
        width: mWidth,
        x: mPos,
      }}
      drag="x"
      dragElastic={0}
      dragMomentum={false}
      layout
      layoutId={project.id}
      transition={{ duration: 0.3 }}
      key={project.id}
      // onDrag={(event, info) => handleDrag(event, info, "center")}
      onDragEnd={async (event, info) => {
        const newPos = snapPosition(mPos.get() + info.delta.x);
        console.log("NEW DATE:", getDateFromPosition(newPos).toISOString());
        const res = await updateProject(project.id, {
          startDate: getDateFromPosition(newPos).toISOString(),
          endDate: getDateFromPosition(newPos + mWidth.get()).toISOString(),
        });
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
        console.log("RES: ", res);
      }}
    >
      {JSON.stringify(new Date(project.startDate!))} {mPos.get()} {startDays}
    </motion.div>
  );
};

export default Item;
