import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "@mui/material/styles";

import type { UserInfo } from "../../types";

const Header = () => {
  const theme = useTheme();
  const [user, setUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/userinfo`)
      .then(res => res.json())
      .then(data => setUser(data[0])) // API returns array
      .catch(err => console.error("Failed to load user info", err));
  }, []);

  if (!user) return null;

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={user.Picture || undefined}
            alt={user["First Name"]}
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
          >
            {user["First Name"]} {user["Last Name"]}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          {user.Github && (
            <IconButton
              component="a"
              href={user.Github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
          )}
          {user.LinkedIn && (
            <IconButton
              component="a"
              href={user.LinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          )}
          {user.Website && (
            <IconButton
              component="a"
              href={user.Website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <LanguageIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
