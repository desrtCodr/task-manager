import React from "react";
import { useSession, signOut } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";

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
    <header className="flex items-center justify-between gap-1 p-3 xs:flex-col sm:flex-row">
      <div className="flex justify-between gap-1 px-2 xs:max-md:w-full sm:justify-start md:flex-col">
        <Image
          className="flex items-center justify-center py-1 md:hidden"
          src="/favicon.ico"
          width={60}
          height={60}
          alt="Logo"
        />
        <div className="flex ">
          <div>
            <div className="flex items-center gap-2 xs:justify-between">
              <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
                Task Manager
              </h1>
              <p className="text-md mt-1 font-medium text-gray-500">
                -- Get Your Life Together --
              </p>
            </div>

            <form className="flex gap-2 xs:max-sm:justify-between">
              <input
                placeholder="Enter New Project"
                className="flex border px-2 py-1"
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
              />
              <button
                className="flex w-fit rounded-lg border border-cyan-600 px-2 py-1 text-center font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
                onClick={() => createProject({ name: newProject })}
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Image
          className="flex items-center justify-center xs:max-md:hidden"
          src="/favicon.ico"
          width={50}
          height={50}
          alt="Logo"
        />
      </div>
      <div className="flex items-center justify-between gap-1 px-2 xs:max-sm:w-full sm:min-w-fit sm:flex-col">
        {sessionData && (
          <div className="text-md flex items-center gap-2 text-gray-500">
            <Image
              className="rounded-full"
              src={sessionData.user?.image || "/favicon.cio"}
              width={25}
              height={25}
              alt="Profile Pic"
            />
            <p className="">
              {sessionData.user?.name || sessionData.user.email}
            </p>
          </div>
        )}
        <button
          className="rounded-lg  border border-cyan-600 px-3 py-1 font-semibold text-gray-500 no-underline transition hover:bg-cyan-500/50"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
export default Header;
