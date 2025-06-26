// src/components/TagFilter/TagFilterBar.tsx

import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import type { Tag } from "../../types";

interface TagFilterBarProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClear: () => void;
}

const TagFilterBar: React.FC<TagFilterBarProps> = ({ selectedTags, onTagToggle, onClear }) => {
  const [tags, setTags] = React.useState<Tag[]>([]);

  React.useEffect(() => {
    fetch("/api/tags")
      .then(res => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="medium" gutterBottom>
        Filter by Tag
      </Typography>

      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            clickable
            color={selectedTags.includes(tag) ? "primary" : "default"}
            onClick={() => onTagToggle(tag)}
          />
        ))}

        {selectedTags.length > 0 && (
          <Chip
            label="Clear Filters"
            clickable
            onClick={onClear}
            color="secondary"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
};

export default TagFilterBar;
