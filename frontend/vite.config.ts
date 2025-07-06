import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // This replaces process.cwd() safely in Vite 5 bundler mode
    const env = loadEnv(mode, new URL('.', import.meta.url).pathname, '');

    return {
        plugins: [react()],
        define: {
            'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE),
        },
        server: {
            proxy: {
                '/api': env.VITE_API_BASE || 'http://localhost:3001',
            },
        },
    };
});
