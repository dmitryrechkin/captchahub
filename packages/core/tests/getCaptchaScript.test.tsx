import { describe, it, expect, vi } from 'vitest';
import { getCaptchaScript } from '../src/Function/getCaptchaScript';
import type { TypeBaseConfig } from '../src/Type/Types';
import React from 'react';

vi.mock('../src/Factory', () => {
	return {
		CaptchaFactory: vi.fn().mockImplementation(() => {
			return {
				create: vi.fn().mockResolvedValue({
					getCaptchaScript: () => () => <div>Mocked Script</div>
				})
			};
		})
	};
});

describe('getCaptchaScript', () => {
	it('should return a React component for the captcha script', async () => {
		const config: TypeBaseConfig = { CAPTCHA_PROVIDER: 'test-provider' };
		const scriptComponent = await getCaptchaScript(config);
		expect(scriptComponent).toBeDefined();
		expect(typeof scriptComponent).toBe('function'); // Check if it's a React component
	});
});
