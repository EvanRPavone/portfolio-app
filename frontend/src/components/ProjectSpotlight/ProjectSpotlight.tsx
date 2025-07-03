// src/components/ProjectSpotlight/ProjectSpotlight.tsx

import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { Project } from "../../types";
import removeMarkdown from "remove-markdown";

interface ProjectSpotlightProps {
  images: Record<string, string>;
}

const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ images }) => {
  const [highlighted, setHighlighted] = React.useState<Project | null>(null);

  React.useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then((projects: Project[]) => {
        const spotlight = projects.find(p => p.Highlight === "TRUE");
        if (spotlight) setHighlighted(spotlight);
      })
      .catch(console.error);
  }, []);

  if (!highlighted) return null;

  const mainImageName = highlighted.Images.split(",")[0]?.trim();
  const mainImageUrl = images[mainImageName] || "";

  return (
    <Box mb={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Project Spotlight
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        {mainImageUrl && (
          <CardMedia
            component="img"
            image={mainImageUrl}
            alt={highlighted.Title}
            sx={{ width: { md: 400 }, height: "100%", objectFit: "cover" }}
          />
        )}

        <Box display="flex" flexDirection="column" flex={1}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {highlighted.Title}
            </Typography>
            <Typography variant="body1">{removeMarkdown(highlighted.Description)}</Typography>
          </CardContent>

          <CardActions sx={{ px: 2, pb: 2 }}>
            {highlighted.Github && (
              <Button
                variant="outlined"
                size="small"
                endIcon={<OpenInNewIcon />}
                href={highlighted.Github}
                target="_blank"
              >
                View Project
              </Button>
            )}
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default ProjectSpotlight;
