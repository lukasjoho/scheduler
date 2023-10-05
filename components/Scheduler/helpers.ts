import { Prisma } from "@prisma/client";

export function getDatesBetween(startDate: Date, endDate: Date) {
  const dates = [];
  let currentDate = startDate;
  let rightDate = endDate;
  while (currentDate <= rightDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function groupDatesByMonth(dates: any) {
  const monthGroups = [];
  let currentMonth = "";

  for (const date of dates) {
    const month = date.getMonth();

    if (month !== currentMonth) {
      monthGroups.push([]);
      currentMonth = month;
    }
    //@ts-ignore
    monthGroups[monthGroups.length - 1].push(date);
  }

  return monthGroups;
}

export function getMonthName(date: any) {
  const options = { month: "long" };
  return date.toLocaleString("en-US", options);
}

export function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function haveOverlap(
  project1: Prisma.ProjectGetPayload<{}>,
  project2: Prisma.ProjectGetPayload<{}>
) {
  const startDate1 = new Date(project1.startDate!);
  const endDate1 = new Date(project1.endDate!);
  const startDate2 = new Date(project2.startDate!);
  const endDate2 = new Date(project2.endDate!);

  return (
    (startDate1 <= endDate2 && startDate2 <= endDate1) ||
    (startDate2 <= endDate1 && startDate1 <= endDate2) ||
    (startDate1 <= startDate2 && endDate1 >= endDate2) ||
    (startDate2 <= startDate1 && endDate2 >= endDate1)
  );
}

type Project = Prisma.ProjectGetPayload<{}>;

type Swimlane = Project[];

export function getSwimlanes(projects: Project[]) {
  let swimlanes: Swimlane[] = [];
  projects.forEach((project) => {
    let addedToSwimlane = false;
    swimlanes.forEach((swimlane) => {
      let canAddToSwimlane = true;
      swimlane.forEach((swimlaneProject) => {
        if (haveOverlap(project, swimlaneProject)) {
          canAddToSwimlane = false;
          return;
        }
      });

      if (canAddToSwimlane) {
        swimlane.push(project);
        addedToSwimlane = true;
        return;
      }
    });
    if (!addedToSwimlane) {
      swimlanes.push([project]);
    }
  });

  return swimlanes;
}

export function getDateDifferenceInDays(date1: Date, date2: Date) {
  const timeDifference = date2.getTime() - date1.getTime();
  return Math.abs(Math.floor(timeDifference / (24 * 60 * 60 * 1000)));
}
