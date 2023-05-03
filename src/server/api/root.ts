import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "~/server/api/routers/projects";
import { taskRouter } from "~/server/api/routers/tasks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  projects: projectRouter,
  tasks: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
