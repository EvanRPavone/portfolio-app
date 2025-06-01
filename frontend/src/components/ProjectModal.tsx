import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Link,
  Chip,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Project } from "../types/Project";

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

const ProjectModal: React.FC<Props> = ({ open, onClose, project }) => {
  if (!project) return null;

  const tags = project["Tags"]?.split(",").map((tag) => tag.trim()) || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {project["Title"] || "Untitled"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Screenshot placeholder */}
        <Box sx={{ height: 240, backgroundColor: "#e0e0e0", mb: 2 }} />

        <Typography sx={{ mb: 2 }}>
          {project["Description"] || "No description provided."}
        </Typography>

        {tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            {tags.map((tag, idx) => (
              <Chip key={idx} label={tag} size="small" />
            ))}
          </Stack>
        )}

        {/* Optional Fields */}
        {project["Type"] && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Type:</strong> {project["Type"]}
          </Typography>
        )}
        {project["Date"] && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Date:</strong> {project["Date"]}
          </Typography>
        )}

        {project["Github"] && (
          <Link href={project["Github"]} target="_blank" rel="noopener">
            GitHub ↗
          </Link>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
