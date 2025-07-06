// src/components/AboutCard/AboutCard.tsx

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { UserInfo } from "../../types";

interface AboutCardProps {
    user: UserInfo;
}

const AboutCard: React.FC<AboutCardProps> = ({ user }) => {
    const {
        "First Name": firstName,
        "Last Name": lastName,
        Bio,
        Location,
        "Resume URL": resumeUrl,
    } = user;

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    About {firstName} {lastName}
                </Typography>

                {Bio && (
                    <Typography variant="body1" paragraph>
                        {Bio}
                    </Typography>
                )}

                {Location && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {Location}
                        </Typography>
                    </Box>
                )}

                {resumeUrl && (
                    <Box mt={3}>
                        <Button
                            variant="outlined"
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            aria-label="View resume"
                        >
                            Resume
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default AboutCard;
