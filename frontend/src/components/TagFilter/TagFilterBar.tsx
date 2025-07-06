// src/components/TagFilter/TagFilterBar.tsx

import React, { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import type { Tag } from "../../types";

interface TagFilterBarProps {
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    onClear: () => void;
}

const TagFilterBar: React.FC<TagFilterBarProps> = ({
    selectedTags,
    onTagToggle,
    onClear,
}) => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/tags`)
            .then((res) => res.json())
            .then(setTags)
            .catch(console.error);
    }, []);

    return (
        <Box mb={4}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
                Filter by Tag
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    overflowX: "auto",
                    pb: 1,
                }}
            >
                {tags.map((tag) => (
                    <Chip
                        key={String(tag)}
                        label={tag}
                        clickable
                        color={selectedTags.includes(tag) ? "primary" : "default"}
                        onClick={() => onTagToggle(tag)}
                        aria-label={`Filter by ${tag}`}
                    />
                ))}

                {selectedTags.length > 0 && (
                    <Chip
                        label="Clear Filters"
                        clickable
                        onClick={onClear}
                        color="secondary"
                        variant="outlined"
                        aria-label="Clear tag filters"
                    />
                )}
            </Box>
        </Box>
    );
};

export default TagFilterBar;
