// src/components/Footer/Footer.tsx

// import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
  const auth = useAuth(); // ✅ get the whole object to track updates
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${import.meta.env.VITE_GOOGLE_SHEET_ID}`;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 4,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Evan Pavone. All rights reserved.
        </Typography>

        {auth.isOwner && (
          <Link href={sheetUrl} target="_blank" rel="noopener" underline="hover">
            View Google Sheet
          </Link>
        )}
      </Stack>
    </Box>
  );
};

export default Footer;
