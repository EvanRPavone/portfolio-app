import React, { useEffect, useState } from "react";
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
    useTheme,
    Skeleton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReactMarkdown from "react-markdown";
import type { Project } from "../../types";

interface ProjectSpotlightProps {
    images: Record<string, string>;
}

const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ images }) => {
    const [highlighted, setHighlighted] = useState<Project | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
            .then((res) => res.json())
            .then((projects: Project[]) => {
                const spotlight = projects.find((p) => p.Highlight === "TRUE");
                if (spotlight) setHighlighted(spotlight);
            })
            .catch(console.error);
    }, []);

    if (!highlighted) return null;

    const mainImageName = highlighted.Images?.split(",")[0]?.trim();
    const mainImageUrl = images[mainImageName] || "";
    const tags = highlighted.Tags?.split(",").map((t) => t.trim()) || [];

    const borderRGBA = `${theme.palette.secondary.main}66`;

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
                <Box
                    sx={{
                        width: { md: 400 },
                        height: { xs: 200, md: "100%" },
                        position: "relative",
                        flexShrink: 0,
                    }}
                >
                    {!imageLoaded && !imageError && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="100%"
                            sx={{ position: "absolute", top: 0, left: 0, borderRadius: 0 }}
                        />
                    )}
                    {mainImageUrl && (
                        <CardMedia
                            component="img"
                            image={mainImageUrl}
                            alt={highlighted.Title || "Project image"}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: imageLoaded ? "block" : "none",
                            }}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                const img = e.currentTarget;
                                img.src = "/fallback.png";
                                setImageError(true);
                                setImageLoaded(true);
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {highlighted.Title}
                        </Typography>

                        <Box mb={2}>
                            <ReactMarkdown>{highlighted.Description}</ReactMarkdown>
                        </Box>

                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {tags.map((tag) => (
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
                                rel="noopener noreferrer"
                                aria-label={`View ${highlighted.Title} on GitHub`}
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
