import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import Header from "./Header";
import ProjectView from "./ProjectCard";

const TaskManager: NextPage = () => {
  // state for editing project name, description

  const { data: currentProjects } = api.projects.getProjects.useQuery({
    category: "Short-Term",
  });
  const { data: futureProjects } = api.projects.getProjects.useQuery({
    category: "Long-Term",
  });

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
