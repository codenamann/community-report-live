import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(async ({ mode }) => {
  const devPlugins = [];
  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      devPlugins.push(componentTagger());
    } catch (e) {
      // If lovable-tagger cannot be loaded (ESM/availability), skip silently
    }
  }

  return ({
  server: {
    host: "::",
    port: 8080,
  },
    plugins: [react(), ...devPlugins].filter(Boolean),
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  });
});
