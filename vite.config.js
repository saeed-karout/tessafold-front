import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for debugging in production
    rollupOptions: {
      // Ensure JSON files are included in the build
      input: {
        main: path.resolve(__dirname, 'index.html'), // Use path.resolve instead of resolve
      },
      output: {
        // Customize asset file names to avoid caching issues
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  // Do not force JSON to be treated as raw/static assets. Vite handles JSON modules
  // natively (they are bundled as JS imports). Forcing JSON into assets causes
  // imports like `/src/data/locales/ar/translation.json?import=1` at runtime which
  // can lead to 500 errors after deploying the built output.
  base: '/', // Adjust to '/your-repo/' for GitHub Pages or custom domain
});