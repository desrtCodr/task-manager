import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getProjects: protectedProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { category } = input;
      const findProjects = await ctx.prisma.project.findMany({
        where: {
          userId,
          category,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return findProjects;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const project = await ctx.prisma.project.create({
        data: {
          projectName: input.name,
          userId,
        },
      });
      return project;
    }),
  updateProjectName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        projectName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, projectName } = input;
      const updateProjectName = await ctx.prisma.project.update({
        where: { id },
        data: {
          projectName,
        },
      });
      return updateProjectName;
    }),

  updateDescription: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, description } = input;
      const updateDescription = await ctx.prisma.project.update({
        where: { id },
        data: {
          description,
        },
      });
      return updateDescription;
    }),
  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, category } = input;
      const updateCategory = await ctx.prisma.project.update({
        where: { id },
        data: {
          category,
        },
      });
      return updateCategory;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //const userId = ctx.session.user.id;
      const deleteProject = await ctx.prisma.project.delete({
        where: { id: input.id },
      });
      return deleteProject;
    }),
});
