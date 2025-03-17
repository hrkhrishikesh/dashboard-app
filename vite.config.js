import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Silent deprecation warnings
        quietDeps: true,
        // Enable newer syntax compatibility
        sassOptions: {
          outputStyle: "expanded",
          quietDeps: true,
          charset: false,
        },
      },
    },
  },
  // Suppress Sass warnings in the console
  logger: {
    suppressWarning: true,
  },
});
