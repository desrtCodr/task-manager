import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import Header from "../components/Header";
import ProjectView from "../components/ProjectCard";
import { useSession } from "next-auth/react";
import Loading from "~/components/Loading";
import Link from "next/link";

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
      <div className="">
        <Header />
        <main className="flex flex-col xs:h-fit md:h-screen md:flex-row">
          <section className="m-1 bg-gray-400 p-2 xs:h-fit md:h-screen ">
            <div className="flex justify-between">
              <h2 className="p-1 text-xl font-bold text-slate-800">Projects</h2>
              <Link
                href="/taskManager/#long-term"
                scroll={false}
                className="p-1 text-xl font-bold text-slate-800 md:hidden"
              >
                Long-Term Projects
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {currentProjects?.map((project) => (
                <ProjectView key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section
            id="long-term"
            className="m-1 bg-gray-700 p-2 xs:h-fit md:h-screen"
          >
            <h2 className="p-2 text-xl font-bold text-slate-200">
              Long-Term Projects
            </h2>
            <div className="flex flex-wrap gap-4">
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
