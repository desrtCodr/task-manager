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
    <header className="flex flex-col items-center justify-between gap-2 p-5 sm:flex-row">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
          Task Manager
          <span className="mt-1 text-lg font-medium text-gray-500">
            -- Get Your Life Together --
          </span>
        </h1>
        <form className="flex gap-2">
          <input
            placeholder="Enter New Project"
            className="border px-4 py-1"
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <button
            className="rounded-lg border border-cyan-600 px-2 py-1 font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
            onClick={() => createProject({ name: newProject })}
          >
            Add Project
          </button>
        </form>
      </div>
      <div className="flex items-center justify-between gap-1 sm:flex-col">
        <p className="text-md text-gray-500">
          {sessionData && (
            <span>
              Hello {sessionData.user?.name || sessionData.user.email}
            </span>
          )}
        </p>
        <button
          className="float-right rounded-lg  border border-cyan-600 px-3 py-1 font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
export default Header;
