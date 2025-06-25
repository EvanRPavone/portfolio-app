// src/layout/Root.tsx

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "../App";
import { getCustomTheme } from "../theme/theme";
import type { Customization } from "../types";

const Root = () => {
  const [customization, setCustomization] = React.useState<Customization | null>(null);

  React.useEffect(() => {
    fetch("/api/customization")
      .then(res => res.json())
      .then(data => setCustomization(data))
      .catch(err => {
        console.error("Failed to load customization:", err);
        setCustomization({
          primarycolor: "#ff9b00",
          secondarycolor: "#0049ff",
          font: "Inter",
          themestyle: "dark",
          layout: "grid"
        });
      });
  }, []);

  if (!customization) return <div>Loading theme...</div>;

  const theme = getCustomTheme(customization);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default Root;
