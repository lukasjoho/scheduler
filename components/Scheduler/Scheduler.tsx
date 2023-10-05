import { getProjects } from "@/lib/actions";
import React from "react";
import SchedulerHeader from "./SchedulerHeader";
import { getSwimlanes, haveOverlap } from "./helpers";
import Item from "./Item";
import config from "./config";

const Scheduler = async () => {
  const projects = await getProjects();
  const swimlanes = getSwimlanes(projects);

  return (
    <>
      <div className="border rounded-lg w-full min-h-[300px] overflow-scroll">
        <SchedulerHeader config={config} />
        <div className="space-y-2 relative">
          {swimlanes.map((swimlane, idx) => (
            <div className="relative h-12 border-b" key={idx}>
              {swimlane.map((project) => (
                <Item key={project.id} project={project} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* <pre>SWIMLANES: {JSON.stringify(swimlanes, null, 2)}</pre> */}
    </>
  );
};

export default Scheduler;
