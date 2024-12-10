import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text'],
			include: [
				'src/api/v1/**/*.ts',
				'src/application/**/*.ts',
				'src/domain/**/*.ts',
				'src/infrastructure/**/*.ts',
				'src/interface-adapter/**/*.ts'
			]
		}
	}
});
