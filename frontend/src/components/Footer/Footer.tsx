// src/components/Footer/Footer.tsx

import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import type { UserInfo } from "../../types";

const Footer: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    fetch("/api/userinfo")
      .then(res => res.json())
      .then(data => setUserInfo(data[0]))
      .catch(console.error);
  }, []);

  if (!userInfo) return null;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: theme => theme.palette.background.paper,
        borderTop: "1px solid",
        borderColor: theme => theme.palette.divider
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {userInfo["First Name"]} {userInfo["Last Name"]}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href={userInfo.Website} target="_blank" rel="noopener" underline="hover">
              Website
            </Link>
            <Link href={userInfo.Github} target="_blank" rel="noopener" underline="hover">
              GitHub
            </Link>
            <Link href={userInfo.LinkedIn} target="_blank" rel="noopener" underline="hover">
              LinkedIn
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
