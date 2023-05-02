import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allProjects = await ctx.prisma.project.findMany();
    return allProjects;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ownerId = ctx.session.user.id;
      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          ownerId,
        },
      });
      return project;
    }),
});
