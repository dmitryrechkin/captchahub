import { describe, it, expect, vi } from 'vitest';
import { verifyCaptcha } from '../../src/Function/verifyCaptcha';
import type { TypeBaseConfig } from '../../src/Type/Types';

vi.mock('../../src/Factory', () => {
	return {
		CaptchaFactory: vi.fn().mockImplementation(() => {
			return {
				create: vi.fn().mockResolvedValue({
					verifyCaptcha: (formFieldValues: Record<string, any>) => {
						return formFieldValues.response === 'valid-response';
					}
				})
			};
		})
	};
});

describe('verifyCaptcha', () => {
	const config: TypeBaseConfig = { CAPTCHA_PROVIDER: 'test-provider' };

	it('should return true for valid captcha response', async () => {
		const result = await verifyCaptcha({ response: 'valid-response' }, config);
		expect(result).toBe(true);
	});

	it('should return false for invalid captcha response', async () => {
		const result = await verifyCaptcha({ response: 'invalid-response' }, config);
		expect(result).toBe(false);
	});
});
