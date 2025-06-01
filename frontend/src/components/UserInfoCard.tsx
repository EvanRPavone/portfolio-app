import React from "react";
import { Box, Typography, Link, Stack, Button } from "@mui/material";
import type { UserInfo } from "../types/Project";

type Props = {
    user: UserInfo;
};

const UserInfoCard: React.FC<Props> = ({ user }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                {user["First Name"]} {user["Last Name"]}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {user["Bio"]}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user["Location"]}
            </Typography>

            <Stack direction="row" spacing={2}>
                <Link href={user["Github"]} target="_blank" rel="noopener">
                    GitHub ↗
                </Link>
                <Link href={user["LinkedIn"]} target="_blank" rel="noopener">
                    LinkedIn ↗
                </Link>
                <Link href={user["Website"]} target="_blank" rel="noopener">
                    Website ↗
                </Link>
                <Button
                    href={user["Resume URL"]}
                    target="_blank"
                    rel="noopener"
                    variant="outlined"
                    size="small"
                >
                    Resume
                </Button>
            </Stack>
        </Box>
    );
};

export default UserInfoCard;
