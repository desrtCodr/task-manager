import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import Header from "../components/Header";
import ProjectView from "../components/ProjectCard";
import { useSession } from "next-auth/react";
import Loading from "~/components/Loading";

const TaskManager: NextPage = () => {
  useSession({ required: true });

  const { data: currentProjects } = api.projects.getProjects.useQuery({
    category: "Short-Term",
  });
  const { data: futureProjects } = api.projects.getProjects.useQuery({
    category: "Long-Term",
  });

  if (!currentProjects || !futureProjects) return <Loading />;

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main className="grid grid-cols-4">
          <section className="col-span-3 col-start-1 m-1 h-screen bg-gray-400 p-2">
            <h2 className="p-2">Short-Term Projects</h2>
            <div className="grid grid-cols-3 gap-4">
              {currentProjects?.map((project) => (
                <ProjectView key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section className="grid-span-1 col-start-4 m-1 h-screen bg-gray-600 p-2">
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
