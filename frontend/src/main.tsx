import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getCustomization } from "./api";
import { getCustomTheme } from "./styles/theme";

(async () => {
    const customizationRes = await getCustomization();
    const customization = customizationRes.data; // This should be Customization[]

    const theme = getCustomTheme(customization);

    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
})();
