import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    Stack,
    Link,
    Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { Project } from "../../types";
import removeMarkdown from "remove-markdown";

interface ProjectCardProps {
    project: Project;
    images: Record<string, string>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, images }) => {
    const theme = useTheme();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const imageNames = project.Images?.split(",").map((name) => name.trim()) || [];
    const firstImageURL = images[imageNames[0]] || "";
    const tags = project.Tags?.split(",").map((tag) => tag.trim()) || [];

    const borderRGBA = `${theme.palette.secondary.main}66`;

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${borderRGBA}`,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
            }}
        >
            {firstImageURL && (
                <Box sx={{ position: "relative", height: 180 }}>
                    {!imgLoaded && !imgError && (
                        <Skeleton variant="rectangular" width="100%" height={180} />
                    )}

                    <CardMedia
                        component="img"
                        image={firstImageURL}
                        alt={project.Title || "Project image"}
                        height="180"
                        onLoad={() => setImgLoaded(true)}
                        onError={(e) => {
                            setImgError(true);
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null;
                            img.src = "/fallback.png";
                        }}
                        sx={{
                            display: imgLoaded ? "block" : "none",
                        }}
                    />
                </Box>
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {project.Title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {removeMarkdown(project.Description)}
                </Typography>

                {tags.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                        {tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                {project.Github && (
                    <Box mt={2}>
                        <Link
                            href={project.Github}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            aria-label={`View ${project.Title} on GitHub`}
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
