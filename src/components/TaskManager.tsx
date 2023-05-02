import React from "react";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const TaskManager: NextPage = () => {
  const [value, setValue] = React.useState("");
  const { data: sessionData } = useSession();

  const { data: allProjects } = api.projects.getAll.useQuery();
  const { mutate } = api.projects.create.useMutation();

  return (
    <>
      <div className="min-h-screen bg-gray-400">
        <header className="grid grid-cols-3 gap-10 bg-gray-200 shadow">
          <div className="ml-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="mt-1 text-lg text-gray-500">Get Your Life Together</p>
          </div>
          <form className="grid max-w-7xl grid-cols-2 items-center justify-center gap-3 px-4 py-6 sm:px-6 lg:px-8">
            <input
              placeholder="Enter New Project"
              className="border px-5 py-3"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="rounded-full border border-cyan-600 px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-white/50"
              onClick={() => mutate({ name: value })}
            >
              Add Project
            </button>
          </form>
          <div className="mr-10 grid max-w-7xl grid-cols-2 items-center px-4 py-6 sm:px-6 lg:px-8">
            <p className="float-right text-lg text-gray-500">
              {sessionData && <span>Hello {sessionData.user?.name}</span>}
            </p>
            <button
              className="float-right rounded-full border border-cyan-600 px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-white/50"
              onClick={() => void signOut()}
            >
              Sign out
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allProjects?.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="overflow-hidden rounded-lg bg-white shadow"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h2 className="text-lg font-medium text-gray-900">
                        {project.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {project.description || "Enter a description"}
                      </p>
                      <ul className="list-disc pl-5">
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TaskManager;
