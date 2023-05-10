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
        <main className="flex flex-col md:flex-row">
          <section className="m-1 h-screen bg-gray-400 p-2 ">
            <div className="flex gap-2 p-1">
              <h2 className="p-1 text-xl">Projects</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {currentProjects?.map((project) => (
                <ProjectView key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section className="m-1 h-screen bg-gray-600 p-2">
            <h2 className="p-2 text-xl">Long-Term Projects</h2>
            <div className="flex gap-4">
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
