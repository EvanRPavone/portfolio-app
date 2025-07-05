// src/components/ProjectList/ProjectList.tsx

import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import TagFilterBar from "../TagFilter/TagFilterBar";
import ProjectModal from "../ProjectModal/ProjectModal";
import type { Project } from "../../types";

interface ProjectListProps {
  images: Record<string, string>;
}

const ProjectList: React.FC<ProjectListProps> = ({ images }) => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [filtered, setFiltered] = React.useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

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

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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

      <Grid container spacing={3}>
        {filtered.map((project) => (
          <Grid
            item
            key={project["Project ID"]}
            xs={12}
            sm={6}
            md={4}
            onClick={() => handleOpenModal(project)}
            style={{ cursor: "pointer" }}
          >
            <ProjectCard project={project} images={images} />
          </Grid>
        ))}
      </Grid>

      <ProjectModal
        open={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
        images={images}
      />
    </>
  );
};

export default ProjectList;
