import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { getTags } from "../api";

type Props = {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
};

const TagFilterBar: React.FC<Props> = ({ selectedTags, onToggleTag, onClearTags }) => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getTags()
      .then((res) => {
        console.log("✅ Tags API response:", res.data);
        setTags(res.data); // assuming flat string[]
      })
      .catch((err) => {
        console.error("❌ Failed to load tags", err);
      });
  }, []);

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, flexWrap: "wrap" }}>
      <Typography variant="subtitle1">Filter by Tags:</Typography>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <Button
            key={tag}
            variant={isSelected ? "contained" : "outlined"}
            onClick={() => onToggleTag(tag)}
          >
            {tag}
          </Button>
        );
      })}
      {selectedTags.length > 0 && (
        <Button color="error" onClick={onClearTags}>
          Clear All
        </Button>
      )}
    </Stack>
  );
};

export default TagFilterBar;
