// src/components/ProjectList/ProjectList.tsx

import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import type { Project, Customization } from "../../types";

const ProjectList = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [customization, setCustomization] = React.useState<Customization | null>(null);

  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);

    fetch("/api/customization")
      .then((res) => res.json())
      .then(setCustomization)
      .catch(console.error);
  }, []);

  if (!customization) return null;

  const isGrid = customization.layout === "grid";

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3} direction={isGrid ? "row" : "column"}>
        {projects.map((project) => (
          <Grid
            item
            key={project["Project ID"]}
            xs={12}
            sm={isGrid ? 6 : 12}
            md={isGrid ? 4 : 12}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProjectList;
