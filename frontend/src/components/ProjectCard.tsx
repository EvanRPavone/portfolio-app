import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Stack,
  Button,
  Box,
} from "@mui/material";
import type { Project } from "../types/Project";


type Props = {
    project: Project;
    onClick: () => void;
};

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const tags = project["Tags"]?.split(",").map((tag) => tag.trim()) || [];

  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Thumbnail Placeholder */}
      <Box sx={{ height: 140, backgroundColor: "#e0e0e0" }} />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          {project["Title"] || "Untitled"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {project["Description"] || "No description provided."}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Stack>

        {project["Github"] && (
          <Link href={project["Github"]} target="_blank" rel="noopener" sx={{ mb: 2 }}>
            GitHub ↗
          </Link>
        )}

        <Box sx={{ mt: "auto" }}>
          <Button variant="outlined" onClick={onClick} fullWidth>
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
