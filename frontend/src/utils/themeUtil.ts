export const parseCustomization = (config: { [key: string]: string }) => {
    return {
        primary: config["Primary Color"] || "#9860ff",
        secondary: config["Secondary Color"] || "#9860ff",
        font: config["Font"] || "Inter",
        themeStyle: config["Theme Style"] || "dark",
        layout: config["Layout"] || "grid",
    };
};
