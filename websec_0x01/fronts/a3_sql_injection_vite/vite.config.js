import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '6.19.128.100'
    },
    base: '/',
    build: {
        rollupOptions: {
            input: './templates/a3_sql_injection.html',
            output: {
                entryFileNames: 'static/tasks/a3_sql_injection.js',
                chunkFileNames: 'static/chunks/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            }
        },
        outDir: '../../src/webapp',
        emptyOutDir: false,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    }
});
