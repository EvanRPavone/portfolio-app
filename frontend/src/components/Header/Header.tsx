import {
    AppBar,
    Toolbar,
    Avatar,
    Typography,
    IconButton,
    Box,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

import type { UserInfo } from "../../types";

interface HeaderProps {
    user: UserInfo | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar
                sx={{
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "center" : "flex-start",
                    gap: 2,
                    py: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                        src={user?.Picture || "/fallback.png"}
                        alt={user?.["First Name"]}
                        sx={{ width: 48, height: 48 }}
                        onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null;
                            img.src = "/fallback.png";
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {user?.["First Name"]} {user?.["Last Name"]}
                    </Typography>
                </Box>

                {user && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
