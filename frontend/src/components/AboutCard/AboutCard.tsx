import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { UserInfo } from "../../types";

interface AboutCardProps {
  user: UserInfo;
}

const AboutCard: React.FC<AboutCardProps> = ({ user }) => {
  const { "First Name": firstName, "Last Name": lastName, Bio, Location } = user;

  return (
    <Card sx={{ mb: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About {firstName} {lastName}
        </Typography>
        <Typography variant="body1" paragraph>
          {Bio}
        </Typography>

        {Location && (
          <Box display="flex" alignItems="center" mt={1}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {Location}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutCard;
