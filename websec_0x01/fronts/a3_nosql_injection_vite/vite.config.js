import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 3000,
		proxy: {
			'/api': 'http://127.0.0.1:8000'
		}
    },
    base: '/',
    build: {
        rollupOptions: {
            input: './templates/a3_nosql_injection.html',
            output: {
                entryFileNames: 'static/tasks/a3_nosql_injection.js',
                chunkFileNames: 'static/chunks/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            }
        },
        outDir: '../../webapp',
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
