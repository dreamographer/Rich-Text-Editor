import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // TanStackRouterVite(),
    sentryVitePlugin({
      org: "elt-global-pvt-ltd",
      project: "curate-client",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
  },
});
