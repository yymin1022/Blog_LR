import type { Config } from "tailwindcss";

const config: Config = {
      content: [
            "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
            extend: {
                  colors: {
                        primary: {
                              blog_black: "#000000",
                              blog_blue: "#164EAB",
                              blog_gray: "#606060",
                              blog_lightgray_1: "#808080",
                              blog_lightgray_2: "#AAAAAA",
                              blog_lightgray_3: "#DDDDDD",
                              blog_white: "#FFFFFF"
                        }
                  }
            },
      },
      plugins: [],
};
export default config;
