
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define default environment variables
  define: {
    // Make empty environment variables to prevent errors
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(''),
    'import.meta.env.VITE_YOUTUBE_API_KEY': JSON.stringify(''),
  }
}));
