import React from "react";
import TaskView from "./TaskCard";
import { api } from "~/utils/api";
import { type Project } from "@prisma/client";
import { TbTrashX } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";

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

  const handleDelete = (id: string) => {
    confirm("Are you sure you want to delete this project?")
      ? deleteProject({ id: id })
      : null;
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
              className="flex gap-2 text-lg font-medium text-gray-900"
              onClick={() => {
                setEditProjectName(true);
              }}
            >
              {project.projectName || "Enter a project name"}
              <span className="flex items-center">
                <BsPencilSquare />
              </span>
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

          <button
            onClick={() => {
              handleDelete(project.id);
            }}
          >
            <TbTrashX className="text-2xl" />
          </button>
        </header>
        {!editDescription ? (
          <p
            className="flex gap-2 text-sm text-gray-500"
            title="Project Description"
            onClick={() => setEditDescription(true)}
          >
            {project.description || "Add Description"}
            <span className="flex items-center">
              <BsPencilSquare />
            </span>
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
