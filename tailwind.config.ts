import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Manrope", ...defaultTheme.fontFamily.sans],
                manrope: ["Manrope", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#2563EB",
                secondary: "#9333EA",
            },
            borderRadius: {
                lg: "0.75rem",
                xl: "1rem",
            },
        },
    },
    plugins: [],
};

export default config;