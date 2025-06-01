import React from "react";
import { Box, Typography, Link, Stack, Avatar, Button } from "@mui/material";

type Props = {
    user: { [key: string]: string };
};

const Header: React.FC<Props> = ({ user }) => {
    const fullName = `${user["First Name"] ?? ""} ${user["Last Name"] ?? ""}`.trim();

    return (
        <Box sx={{ mb: 6, textAlign: "center" }}>
            {user.picture && (
                <Avatar
                    src={user.picture}
                    alt={fullName}
                    sx={{ width: 96, height: 96, mx: "auto", mb: 2 }}
                />
            )}
            <Typography variant="h4" gutterBottom>{fullName}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{user["Bio"]}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user["Location"]}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                {user["Github"] && (
                    <Link href={user["Github"]} target="_blank" underline="hover">GitHub ↗</Link>
                )}
                {user["LinkedIn"] && (
                    <Link href={user["LinkedIn"]} target="_blank" underline="hover">LinkedIn ↗</Link>
                )}
                {user["Website"] && (
                    <Link href={user["Website"]} target="_blank" underline="hover">Website ↗</Link>
                )}
                {user["Resume URL"] && (
                    <Button
                        variant="outlined"
                        size="small"
                        href={user["Resume URL"]}
                        target="_blank"
                    >
                        Resume
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default Header;
