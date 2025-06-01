import { createTheme } from "@mui/material/styles";

export const getCustomTheme = (customization: Record<string, string>) => {
    const isDark = customization.themestyle.toLowerCase() === "dark";

    return createTheme({
        palette: {
            mode: isDark ? "dark" : "light",
            primary: {
                main: customization.primarycolor,
            },
            secondary: {
                main: customization.secondarycolor,
            },
        },
        typography: {
            fontFamily: customization.font,
        },
    });
};

