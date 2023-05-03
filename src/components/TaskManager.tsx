import React from "react";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const TaskView = (props: { projectId: string }) => {
  //get project id from props
  const { projectId } = props;
  //step up state for new task from input
  const [newTask, setNewTask] = React.useState("");
  //get existing tasks from api
  const { data: tasks, isLoading: taskUpdating } = api.tasks.getAll.useQuery({
    projectId,
  });
  const ctx = api.useContext();

  //create mutation for adding new task and upon success clear input and refetch tasks
  const { mutate: createTask } = api.tasks.create.useMutation({
    onSuccess: () => {
      setNewTask("");
      void ctx.tasks.getAll.invalidate({ projectId });
    },
  });

  const { mutate: deleteTask } = api.tasks.delete.useMutation({
    onSuccess: () => {
      void ctx.tasks.getAll.invalidate({ projectId });
    },
  });

  //if tasks are loading show loading message
  if (!tasks) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-2">
      <ul className="">
        {tasks.map((task) => (
          <li key={task.id} className="">
            <div className="grid grid-cols-8 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="grid h-3 w-3 place-items-center text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>

              <p className="col-span-6">{task.name}</p>
              <button onClick={() => deleteTask({ id: task.id })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-5" />
      <div className="grid grid-cols-5 gap-4">
        <input
          className="col-span-3 border px-2 py-2"
          type="text"
          placeholder="Enter New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          disabled={taskUpdating}
        />

        <button
          className="col-span-2 col-end-6 rounded-full border border-cyan-600 p-2 font-semibold text-gray-500 no-underline transition hover:bg-white/50"
          onClick={() => createTask({ name: newTask, projectId })}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

const TaskManager: NextPage = () => {
  const [newProject, setNewProject] = React.useState("");

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
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <button
              className="rounded-full border border-cyan-600 px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-white/50"
              onClick={() => mutate({ name: newProject })}
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
                      <header className="flex justify-between">
                        <h2 className="text-lg font-medium text-gray-900">
                          {project.name}
                        </h2>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </span>
                      </header>
                      <p className="text-sm text-gray-500">
                        {project.description || "Enter a description"}
                      </p>
                      <TaskView projectId={project.id} />
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
