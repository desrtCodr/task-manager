import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import Header from "../components/Header";
import ProjectView from "../components/ProjectCard";
import { useSession } from "next-auth/react";

const TaskManager: NextPage = () => {
  useSession({ required: true });

  const { data: currentProjects } = api.projects.getProjects.useQuery({
    category: "Short-Term",
  });
  const { data: futureProjects } = api.projects.getProjects.useQuery({
    category: "Long-Term",
  });

  if (!currentProjects || !futureProjects) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-3">
        <strong>Getting those projects...</strong>
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main className="grid grid-cols-4">
          <section className="col-span-3 col-start-1 h-screen bg-gray-400 p-2">
            <h2 className="p-2">Short-Term Projects</h2>
            <div className="grid grid-cols-3 gap-4">
              {currentProjects?.map((project) => (
                <ProjectView key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section className="grid-span-1 col-start-4 h-screen bg-gray-600 p-2">
            <h2 className="p-2">Long-Term Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {futureProjects?.map((project) => (
                <ProjectView key={project.id} project={project} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TaskManager;
