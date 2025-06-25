import { createTheme } from "@mui/material/styles";

// Types
import type { Theme } from "@mui/material/styles";
import type { Customization } from "../types";

export function getCustomTheme(customization: Customization): Theme {
  const { primarycolor, secondarycolor, font, themestyle } = customization;

  return createTheme({
    palette: {
      mode: themestyle,
      primary: {
        main: primarycolor,
      },
      secondary: {
        main: secondarycolor,
      },
      background: {
        default: themestyle === "dark" ? "#121212" : "#f5f5f5",
        paper: themestyle === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: font,
    },
    shape: {
      borderRadius: 12,
    },
  });
}
