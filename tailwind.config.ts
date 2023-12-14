import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
    extend:{
      content: {
        "extern": "_↗"
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    themes: [
      {
        mytheme: {
          primary: "#84cc16",
          secondary: "#0ea5e9",
          accent: "#e5e7eb",
          neutral: "#4b5563",
          "base-100": "#f3f4f6",
          info: "#a3e635",
          success: "#67e8f9",
          warning: "#fbbf24",
          error: "#ef4444",
          "--rounded-box": "0.125rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.125rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.125rem", // border radius rounded-badge utility class, used in badges and similar
           "--animation-btn": "0.5s", // duration of animation when you click on button
        },
      },
      "halloween",
    ],
    darkTheme: "halloween",
  },
};
export default config;
