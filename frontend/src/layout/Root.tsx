// src/layout/Root.tsx
import { useEffect, useState } from "react";
import {
    CircularProgress,
    Box,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";
import App from "../App";
import { getCustomTheme } from "../theme/theme";
import type { Customization } from "../types";

const defaultCustomization: Customization = {
    primarycolor: "#ff9b00",
    secondarycolor: "#0049ff",
    font: "Inter",
    themestyle: "dark",
    layout: "grid",
};

const Root = () => {
    const [customization, setCustomization] = useState<Customization | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/customization`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(setCustomization)
            .catch((err) => {
                console.error("Failed to load customization:", err);
                setCustomization(defaultCustomization);
            });
    }, []);

    if (!customization) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                aria-label="Loading theme"
            >
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    const theme = getCustomTheme(customization);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

export default Root;
