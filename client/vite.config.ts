import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })],
      output: {
        manualChunks(id) {
          // Split vendor dependencies into a separate chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Example: Grouping pages into their own chunks
          if (id.includes("src/pages/")) {
            const pageName = id
              .split("/")
              .pop()
              ?.replace(".ts", "")
              .replace(".tsx", "");
            return `page-${pageName}`;
          }
        },
      },
    },
  },
});
