import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      content: {
        extern: "_↗",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    themes: [
      {
        mytheme: {
          primary: "#e7e5e4",
          secondary: "#d6d3d1",
          accent: "#84cc16",
          neutral: "#4b5563",
          "base-100": "#f0f0f0",
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
      {
        mythemeDark: {
          primary: "#e7e5e4",
          secondary: "#d6d3d1",
          accent: "#d6d3d1",
          neutral: "#1c1917",
          "base-100": "#0c2304",
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
    ],
    darkTheme: "mythemeDark",
  },
};
export default config;
