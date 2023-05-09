import React from "react";
import { useSession, signOut } from "next-auth/react";
import { api } from "~/utils/api";

const Header = () => {
  const { data: sessionData } = useSession();
  const [newProject, setNewProject] = React.useState("");
  const ctx = api.useContext();

  const { mutate: createProject } = api.projects.create.useMutation({
    onSuccess: () => {
      void ctx.projects.getProjects.invalidate();
    },
  });
  return (
    <header className="grid grid-cols-5 gap-10 shadow">
      <div className="ml-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <p className="mt-1 text-lg text-gray-500">Get Your Life Together</p>
      </div>
      <form className="col-span-2 col-start-2 grid max-w-7xl grid-cols-2 items-center justify-center gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <input
          placeholder="Enter New Project"
          className="border px-5 py-3"
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button
          className="rounded-full border border-cyan-600 px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
          onClick={() => createProject({ name: newProject })}
        >
          Add Project
        </button>
      </form>
      <div className="col-end-6 mr-10 grid max-w-7xl grid-cols-2 items-center px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-md float-right text-gray-500">
          {sessionData && (
            <span>
              Hello {sessionData.user?.name || sessionData.user.email}
            </span>
          )}
        </p>
        <button
          className="float-right rounded-full border border-cyan-600 px-3 py-1 font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
export default Header;
