const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // For Next.js (App Router)
    "./src/components/**/*.{js,ts,jsx,tsx}", // For Components
  ],
  theme: {
    extend: {},
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
