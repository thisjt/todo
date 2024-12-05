import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text'],
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.d.ts', 'src/hooks.server.ts']
		}
	}
});
