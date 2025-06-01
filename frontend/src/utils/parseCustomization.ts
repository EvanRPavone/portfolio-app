import type { Customization } from "../types/Project";

export type ParsedCustomization = {
    primary: string;
    secondary: string;
    font: string;
    themeStyle: string;
    layout: string;
};

export const parseCustomization = (data: Customization[]): ParsedCustomization => {
    const map = data.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    return {
        primary: map["Primary Color"] || "#1976d2",
        secondary: map["Secondary Color"] || "#dc004e",
        font: map["Font"] || "Roboto",
        themeStyle: map["Theme Style"] || "light",
        layout: map["Layout"] || "grid",
    };
};
