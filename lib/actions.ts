"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import ActionResponse from "./response";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    return ActionResponse.success("Project updated", project);
  } catch (error) {
    return ActionResponse.error("Project updated failed", error);
  }
}
