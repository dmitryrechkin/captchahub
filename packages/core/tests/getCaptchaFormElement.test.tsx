import { describe, it, expect, vi } from 'vitest';
import { getCaptchaFormElement } from '../src/Function/getCaptchaFormElement';
import type { TypeBaseConfig } from '../src/Type/Types';
import React from 'react';

vi.mock('../src/Factory', () => {
	return {
		CaptchaFactory: vi.fn().mockImplementation(() => {
			return {
				create: vi.fn().mockResolvedValue({
					getCaptchaFormElement: () => () => <form>Mocked Form</form>
				})
			};
		})
	};
});

describe('getCaptchaFormElement', () => {
	it('should return a React component for the captcha form element', async () => {
		const config: TypeBaseConfig = { CAPTCHA_PROVIDER: 'test-provider' };
		const formElement = await getCaptchaFormElement(config);
		expect(formElement).toBeDefined();
		expect(typeof formElement).toBe('function'); // Check if it's a React component
	});
});
