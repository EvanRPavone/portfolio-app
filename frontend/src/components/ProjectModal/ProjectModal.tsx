// src/components/ProjectModal/ProjectModal.tsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack,
  Box,
  IconButton
} from "@mui/material";
import Fade from '@mui/material/Fade';
import type { TransitionProps } from '@mui/material/transitions';
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
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
});

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project, images }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    initial: 0,
    loop: false,
  });

  if (!project) return null;

  const imageList = project.Images.split(",")
    .map(name => name.trim())
    .map(name => images[name])
    .filter(Boolean);


  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper" TransitionComponent={Transition}>
      <DialogTitle fontWeight="bold">{project.Title}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ typography: "body1" }}>
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{project.Description}</ReactMarkdown>
        </Box>

        {imageList.length > 0 && (
          <Box mt={2} position="relative">
            <Box ref={sliderRef} className="keen-slider">
              {imageList.map((url, idx) => (
                <Box
                  key={idx}
                  className="keen-slider__slide"
                  component="img"
                  src={url}
                  alt={`Slide ${idx + 1}`}
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              ))}
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
              <IconButton onClick={handlePrev} disabled={currentSlide === 0}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                disabled={currentSlide === imageList.length - 1}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
          {project.Tags.split(",").map(tag => (
            <Chip key={tag} label={tag.trim()} size="small" />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        {project.Github && (
          <Button
            href={project.Github}
            target="_blank"
            rel="noopener"
            endIcon={<OpenInNewIcon />}
            variant="outlined"
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
