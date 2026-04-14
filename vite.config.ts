import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/', // This is correct for custom domains
})
