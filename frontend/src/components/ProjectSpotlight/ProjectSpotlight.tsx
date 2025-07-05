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
  Chip,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReactMarkdown from "react-markdown";
import type { Project } from "../../types";
import { useTheme } from "@mui/material/styles";

interface ProjectSpotlightProps {
  images: Record<string, string>;
}

const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ images }) => {
  const [highlighted, setHighlighted] = React.useState<Project | null>(null);
  const theme = useTheme();

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
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
  const tags = highlighted.Tags?.split(",").map(t => t.trim()) || [];

  // Use secondary color for border, subtle opacity
  const borderRGBA = `${theme.palette.secondary.main}66`; // ~40% opacity

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
          border: `1px solid ${borderRGBA}`,
          borderRadius: 2,
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

            <Box mb={2}>
              <ReactMarkdown>{highlighted.Description}</ReactMarkdown>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {tags.map(tag => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>
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
