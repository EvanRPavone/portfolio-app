// src/components/TagFilter/TagFilterBar.tsx

import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import type { Tag } from "../../types";

const TagFilterBar = () => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = React.useState<string>("");

  React.useEffect(() => {
    fetch("/api/tags")
      .then(res => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  const handleSelect = (tag: string) => {
    setSelectedTag(prev => (prev === tag ? "" : tag));
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="medium" gutterBottom>
        Filter by Tag
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            clickable
            color={selectedTag === tag ? "primary" : "default"}
            onClick={() => handleSelect(tag)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagFilterBar;
