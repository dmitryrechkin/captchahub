import { describe, it, expect, beforeEach } from 'vitest';
import type { TypeTurnstileConfig } from '../../../turnstile/src';
import type { TypeReCaptchaConfig } from '../../../recaptcha/src';
import { CaptchaFactory, CaptchaInterface, TypeBaseConfig } from '../../src';

// Import the providers to register them
import '@captchahub/turnstile';
import '@captchahub/recaptcha';

// Correct configurations for testing (replace with actual test environment values).
const turnstileConfig: TypeTurnstileConfig = {
	CAPTCHA_PROVIDER: 'turnstile',
	TURNSTILE_SITE_KEY: 'your-turnstile-site-key',
};

const recaptchaConfig: TypeReCaptchaConfig = {
	CAPTCHA_PROVIDER: 'recaptcha',
	RECAPTCHA_SITE_KEY: 'your-recaptcha-site-key',
};

const unsupportedProviderConfig: TypeBaseConfig = {
	CAPTCHA_PROVIDER: 'unknown-provider',
};

describe('CaptchaFactory Integration', () => {
	let factory: CaptchaFactory;

	beforeEach(() => {
		factory = new CaptchaFactory();
	});

	describe('create with real providers', () => {
		it('should create a valid Turnstile Captcha', async () => {
			const captcha: CaptchaInterface = factory.create(turnstileConfig);

			expect(captcha).toBeDefined();
			expect(typeof captcha.getCaptchaFormElement).toBe('function');
			expect(typeof captcha.getCaptchaScript).toBe('function');
			expect(typeof captcha.verifyCaptcha).toBe('function');
		});

		it('should create a valid ReCaptcha Captcha', async () => {
			const captcha: CaptchaInterface = factory.create(recaptchaConfig);

			expect(captcha).toBeDefined();
			expect(typeof captcha.getCaptchaFormElement).toBe('function');
			expect(typeof captcha.getCaptchaScript).toBe('function');
			expect(typeof captcha.verifyCaptcha).toBe('function');
		});

		it('should throw an error for an unsupported provider', () => {
			expect(() => factory.create(unsupportedProviderConfig))
				.toThrow(`No captcha factory found for the provider "${unsupportedProviderConfig.CAPTCHA_PROVIDER}".`);
		});
	});
});
