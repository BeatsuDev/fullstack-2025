/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: ["src/**/*.{js,ts,vue,html}"],
    theme: {
        extend: {
            colors: {
                primary: colors.green,
                secondary: colors.blue,
                gray: colors.neutral,
            },
        },
    },
    plugins: [],
};
