// src/components/ProjectList/ProjectList.tsx

import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import TagFilterBar from "../TagFilter/TagFilterBar";
import type { Project, Customization } from "../../types";

const ProjectList = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [filtered, setFiltered] = React.useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [customization, setCustomization] = React.useState<Customization | null>(null);

  // Fetch projects and customization settings
  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setFiltered(data);
      })
      .catch(console.error);

    fetch("/api/customization")
      .then((res) => res.json())
      .then(setCustomization)
      .catch(console.error);
  }, []);

  // Update filtered projects when selectedTags change
  React.useEffect(() => {
    if (selectedTags.length === 0) {
      setFiltered(projects);
    } else {
      const filteredProjects = projects.filter((p) =>
        selectedTags.every((tag) =>
          p.Tags.toLowerCase().split(",").map((t) => t.trim()).includes(tag.toLowerCase())
        )
      );
      setFiltered(filteredProjects);
    }
  }, [selectedTags, projects]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => setSelectedTags([]);

  if (!customization) return null;

  const isGrid = customization.layout === "grid";

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>

      <TagFilterBar
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClear={handleClearFilters}
      />

      <Grid container spacing={3} direction={isGrid ? "row" : "column"}>
        {filtered.map((project) => (
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
