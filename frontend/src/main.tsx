import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getCustomization } from "./api";
import { getCustomTheme } from "./styles/theme";
import LoginPage from "./components/LoginPage";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID!;

const renderApp = async () => {
    const root = ReactDOM.createRoot(document.getElementById("root")!);

    try {
        const customizationRes = await getCustomization();
        const customization = customizationRes.data;
        const theme = getCustomTheme(customization);

        root.render(
            <React.StrictMode>
                <GoogleOAuthProvider clientId={clientId}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </GoogleOAuthProvider>
            </React.StrictMode>
        );
    } catch (error) {
        console.error("❌ Failed to load customization (likely not logged in):", error);
        root.render(<LoginPage />);
    }
};

renderApp();
