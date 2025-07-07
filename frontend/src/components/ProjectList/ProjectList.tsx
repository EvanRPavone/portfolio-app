import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Skeleton } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import TagFilterBar from "../TagFilter/TagFilterBar";
import ProjectModal from "../ProjectModal/ProjectModal";
import type { Project } from "../../types";

interface ProjectListProps {
    images: Record<string, string>;
    openModalId?: string | null;
}

const ProjectList: React.FC<ProjectListProps> = ({ images, openModalId }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filtered, setFiltered] = useState<Project[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
            .then((res) => res.json())
            .then((data: Project[]) => {
                setProjects(data);
                setFiltered(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedTags.length === 0) {
            setFiltered(projects);
            return;
        }

        const filteredProjects = projects.filter((project) => {
            const tagList = project.Tags?.toLowerCase().split(",").map((t) => t.trim()) || [];
            return selectedTags.every((tag) => tagList.includes(tag.toLowerCase()));
        });

        setFiltered(filteredProjects);
    }, [selectedTags, projects]);

    const selectedProject = useMemo(() => {
        return openModalId ? projects.find(p => p["Project ID"] === openModalId) || null : null;
    }, [openModalId, projects]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleClearFilters = () => setSelectedTags([]);

    const handleOpenModal = (project: Project) => {
        navigate(`/${project["Project ID"]}`);
    };

    const handleCloseModal = () => {
        navigate("/");
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
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                          <Grid item xs={12} sm={6} md={4} key={i}>
                              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
                              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
                              <Skeleton variant="text" width="80%" />
                          </Grid>
                      ))
                    : filtered.map((project) => (
                          <Grid
                              item
                              key={String(project["Project ID"])}
                              xs={12}
                              sm={6}
                              md={4}
                              onClick={() => handleOpenModal(project)}
                              sx={{ cursor: "pointer" }}
                              aria-label={`Open details for ${project.Title}`}
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
