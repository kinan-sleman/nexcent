import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine base URL based on environment
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/nexcent/' : '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
});
