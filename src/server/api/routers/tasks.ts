import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const allTasks = await ctx.prisma.task.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
      });
      return allTasks;
    }),
  create: protectedProcedure
    .input(
      z.object({
        taskName: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const projectId = input.projectId;
      const task = await ctx.prisma.task.create({
        data: {
          taskName: input.taskName,
          userId,
          projectId,
        },
      });
      return task;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.delete({
        where: { id: input.id },
      });
      return task;
    }),
});
