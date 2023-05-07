import React from "react";
import TaskView from "./TaskCard";
import { api } from "~/utils/api";
import { type Project } from "@prisma/client";

type ProjectCardProps = {
  key: string;
  project: Project;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props;

  const [projectName, setProjectName] = React.useState("Enter a project name");
  const [description, setDescription] = React.useState("Enter a description");
  // state to toggle input field for editing project name, description
  const [editProjectName, setEditProjectName] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [editCategory, setEditCategory] = React.useState(false);

  //context for api calls
  const ctx = api.useContext();

  const { mutate: updateProjectName } =
    api.projects.updateProjectName.useMutation({
      onSuccess: () => {
        void ctx.projects.getProjects.invalidate();
      },
    });

  const { mutate: updateCategory } = api.projects.updateCategory.useMutation({
    onSuccess: () => {
      void ctx.projects.getProjects.invalidate();
    },
  });

  const { mutate: deleteProject } = api.projects.delete.useMutation({
    onSuccess: () => {
      void ctx.projects.getProjects.invalidate();
    },
  });
  const { mutate: updateDescription } =
    api.projects.updateDescription.useMutation({
      onSuccess: () => {
        setEditDescription(false);
        setDescription("Enter a description");
        void ctx.projects.getProjects.invalidate();
      },
    });

  type handleSubmitProps = {
    event: React.FormEvent<HTMLFormElement>;
    id: string;
    description: string;
  };

  const handleSubmit = (props: handleSubmitProps) => {
    const { event, id, description } = props;
    event.preventDefault();
    updateDescription({ description: description, id: id });
    setEditDescription(false);
  };
  return (
    <div
      key={project.id}
      className="overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-4 py-5 sm:p-6">
        {!editCategory ? (
          <p
            className="text-sm text-gray-500"
            onClick={() => setEditCategory(true)}
          >
            Category: {project.category}
          </p>
        ) : (
          <form>
            <select
              autoFocus
              className="border p-1"
              onChange={(e) => {
                e.preventDefault();
                updateCategory({
                  category: e.target.value,
                  id: project.id,
                });
                setEditCategory(false);
                console.log(e.target.value);
              }}
              onBlur={() => setEditCategory(false)}
            >
              <option value="">Category</option>
              <option value="Short-Term">Short-Term</option>
              <option value="Long-Term">Long-Term</option>
              <option value="Completed">Completed</option>
            </select>
          </form>
        )}

        <header className="flex justify-between">
          {!editProjectName ? (
            <h2
              className="text-lg font-medium text-gray-900"
              onClick={() => {
                setEditProjectName(true);
              }}
            >
              {project.projectName || "Enter a project name"}
            </h2>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProjectName({
                  id: project.id,
                  projectName: projectName,
                });
                setProjectName("Enter a project name");
                setEditProjectName(false);
              }}
              onBlur={() => setEditProjectName(false)}
            >
              <input
                autoFocus
                className="border p-1"
                type="text"
                placeholder={project.projectName}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </form>
          )}

          <button onClick={() => deleteProject({ id: project.id })}>
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
          </button>
        </header>
        {!editDescription ? (
          <p
            className="text-sm text-gray-500"
            title="Project Description"
            onClick={() => setEditDescription(true)}
          >
            {project.description || "Add Description"}
          </p>
        ) : (
          <form
            onSubmit={(event) =>
              handleSubmit({
                event,
                id: project.id,
                description: description,
              })
            }
            onBlur={() => setEditDescription(false)}
          >
            <input
              autoFocus
              type="text"
              className="border p-1 text-sm text-gray-500"
              placeholder={project.description || "Add Description"}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </form>
        )}
        <TaskView projectId={project.id} />
      </div>
    </div>
  );
};
export default ProjectCard;
