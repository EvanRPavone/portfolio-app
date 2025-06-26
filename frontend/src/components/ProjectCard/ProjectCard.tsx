// src/components/ProjectCard/ProjectCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Stack,
  Link,
} from "@mui/material";
import type { Project } from "../../types";
import removeMarkdown from "remove-markdown";

interface ProjectCardProps {
  project: Project;
  images: Record<string, string>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, images }) => {
  const imageNames = project.Images.split(",").map((name) => name.trim());
  const firstImageURL = images[imageNames[0]] || "";

  const tags = project.Tags.split(",").map((tag) => tag.trim());

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {firstImageURL && (
        <CardMedia
          component="img"
          image={firstImageURL}
          alt={project.Title}
          height="180"
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {project.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {removeMarkdown(project.Description)}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
        {project.Github && (
          <Box mt={2}>
            <Link
              href={project.Github}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              View on GitHub
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
