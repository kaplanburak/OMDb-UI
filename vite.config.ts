import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://www.omdbapi.com/",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api/, `?apikey=${process.env.VITE_OMDB_API_KEY}`),
        },
      },
    },
  });
};
