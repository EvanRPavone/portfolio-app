import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Chip,
    Stack,
    Box,
    IconButton,
    Skeleton,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import type { TransitionProps } from "@mui/material/transitions";
import { useKeenSlider } from "keen-slider/react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import "keen-slider/keen-slider.min.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { Project } from "../../types";

interface ProjectModalProps {
    open: boolean;
    onClose: () => void;
    project: Project | null;
    images: Record<string, string>;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Fade ref={ref} {...props} />;
});

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project, images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
    const [imageError, setImageError] = useState<Record<number, boolean>>({});

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        initial: 0,
        loop: false,
    });

    if (!project) return null;

    const imageList =
        project.Images?.split(",")
            .map((name) => name.trim())
            .map((name) => images[name])
            .filter(Boolean) || [];

    const tags = project.Tags?.split(",").map((tag) => tag.trim()) || [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="paper"
            TransitionComponent={Transition}
        >
            <DialogTitle fontWeight="bold">{project.Title}</DialogTitle>

            <DialogContent dividers>
                <Box sx={{ typography: "body1" }}>
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                        {project.Description}
                    </ReactMarkdown>
                </Box>

                {imageList.length > 0 && (
                    <Box mt={3} position="relative">
                        <Box ref={sliderRef} className="keen-slider">
                            {imageList.map((url, idx) => {
                                const hasLoaded = imageLoaded[idx];
                                const hasError = imageError[idx];
                                return (
                                    <Box
                                        key={idx}
                                        className="keen-slider__slide"
                                        sx={{ position: "relative", height: 400 }}
                                    >
                                        {!hasLoaded && !hasError && (
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={400}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        )}
                                        <Box
                                            component="img"
                                            src={url}
                                            alt={`Project image ${idx + 1}`}
                                            onLoad={() =>
                                                setImageLoaded((prev) => ({ ...prev, [idx]: true }))
                                            }
                                            onError={(e) => {
                                                const img = e.currentTarget as HTMLImageElement;
                                                img.src = "/fallback.png";
                                                setImageError((prev) => ({ ...prev, [idx]: true }));
                                            }}
                                            sx={{
                                                width: "100%",
                                                borderRadius: 2,
                                                maxHeight: 400,
                                                objectFit: "cover",
                                                display: hasLoaded ? "block" : "none",
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                right: 0,
                                px: 1,
                                transform: "translateY(-50%)",
                            }}
                        >
                            <IconButton
                                onClick={() => instanceRef.current?.prev()}
                                disabled={currentSlide === 0}
                                aria-label="Previous image"
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => instanceRef.current?.next()}
                                disabled={currentSlide === imageList.length - 1}
                                aria-label="Next image"
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}

                {tags.length > 0 && (
                    <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
                        {tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                {project.Github && (
                    <Button
                        href={project.Github}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                        variant="outlined"
                        aria-label={`View ${project.Title} on GitHub`}
                    >
                        View on GitHub
                    </Button>
                )}
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectModal;
