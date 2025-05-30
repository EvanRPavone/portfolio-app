import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Stack,
} from "@mui/material";

type Props = {
  project: {
    [key: string]: string;
  };
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const tags = project["Tags"]?.split(",").map((tag) => tag.trim()) || [];

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
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
          <Link href={project["Github"]} target="_blank" rel="noopener">
            GitHub ↗
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
