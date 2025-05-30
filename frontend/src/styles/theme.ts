import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // Replace with dynamic from customization later
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
    },
});

export default theme;
