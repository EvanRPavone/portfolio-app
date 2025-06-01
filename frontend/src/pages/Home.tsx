import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { getProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import TagFilterBar from "../components/TagFilterBar";
// import UserInfoCard from "../components/UserInfoCard";
import Header from "../components/Header";
import type { Project, Customization, ImageAsset, UserInfo } from "../types/Project";

type Props = {
    customization: Customization[];
    images: ImageAsset[];
    userInfo: UserInfo[];
};

const Home: React.FC<Props> = ({ customization: _customization, images: _images, userInfo: userInfo }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        getProjects()
            .then((res) => {
                console.log("✅ Project data loaded:", res.data);
                setProjects(res.data);
            })
            .catch((err) => {
                console.error("❌ Failed to fetch projects", err);
            });
    }, []);

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleToggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleClearTags = () => {
        setSelectedTags([]);
    };

    const filteredProjects = selectedTags.length > 0
        ? projects.filter((project) => {
            const projectTags = (project.Tags || "")
                .split(",")
                .map((tag: string) => tag.trim());
            return selectedTags.every((tag) => projectTags.includes(tag));
        })
        : projects;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {userInfo.length > 0 && <Header user={userInfo[0]} />}
            <Typography variant="h4" gutterBottom>
                My Projects
            </Typography>

            <TagFilterBar
                selectedTags={selectedTags}
                onToggleTag={handleToggleTag}
                onClearTags={handleClearTags}
            />

            <Grid container spacing={3}>
                {filteredProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ProjectCard project={project} onClick={() => handleCardClick(project)} />
                    </Grid>
                ))}
            </Grid>

            {selectedProject && (
                <ProjectModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    project={selectedProject}
                />
            )}
        </Container>
    );
};

export default Home;
