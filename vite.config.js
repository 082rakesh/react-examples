import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						return 'vendor'; // ✅ Split node_modules into a separate chunk
					}
					if (id.includes('/screen/')) {
						return 'screens'; // ✅ Separate screen components
					}
				},
			},
		},
	},
});
