export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

export const themes: Record<string, ThemeConfig> = {
    blog1: {
        name: "Blog 1 Placeholder",
        colors: {
            primary: "#000000",
            secondary: "#ffffff",
            accent: "#ff0000",
        },
    },
    blog2: {
        name: "Blog 2 Placeholder",
        colors: {
            primary: "#000000",
            secondary: "#ffffff",
            accent: "#00ff00",
        },
    },
    blog3: {
        name: "Blog 3 Placeholder",
        colors: {
            primary: "#000000",
            secondary: "#ffffff",
            accent: "#0000ff",
        },
    },
    blog4: {
        name: "Blog 4 Placeholder",
        colors: {
            primary: "#000000",
            secondary: "#ffffff",
            accent: "#ffff00",
        },
    },
    blog5: {
        name: "Blog 5 Placeholder",
        colors: {
            primary: "#000000",
            secondary: "#ffffff",
            accent: "#00ffff",
        },
    },
};
