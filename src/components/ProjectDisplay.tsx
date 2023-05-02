import { type NextComponentType } from "next";
import React from "react";
import { api } from "~/utils/api";

const ProjectDisplay: NextComponentType = (projects) => {
  const { data: allProjects } = api.projects.getAll.useQuery();
  console.log("projects:", allProjects);
  return <div>ProjectDisplay</div>;
};

export default ProjectDisplay;
