import { defineConfig } from 'vitest/config';
import path from 'path';

// Get the absolute path to the current directory
const currentDir = path.resolve(__dirname);

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['tests/**/*.test.ts']
	},
	resolve: {
		alias: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@captchahub/core': path.resolve(currentDir, 'src'),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@captchahub/recaptcha': path.resolve(currentDir, '../recaptcha/src'),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@captchahub/turnstile': path.resolve(currentDir, '../turnstile/src')
		}
	}
});
