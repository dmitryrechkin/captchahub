import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ReCaptcha } from '../../src';
import React from 'react';

describe('ReCaptcha Class', () => {
	const config = {
		CAPTCHA_PROVIDER: 'recaptcha',
		RECAPTCHA_SECRET_KEY: 'test_secret_key',
		RECAPTCHA_SITE_KEY: 'test_site_key',
	};

	const recaptcha = new ReCaptcha(config);

	it('verifies captcha successfully', async () => {
		// Mock the fetch API
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ success: true }),
			})
		) as unknown as typeof fetch;

		const result = await recaptcha.verifyCaptcha({ 'g-recaptcha-response': 'test_token' });
		expect(result).toBe(true);
	});

	it('fails to verify captcha with no token', async () => {
		const result = await recaptcha.verifyCaptcha({});
		expect(result).toBe(false);
	});

	it('renders captcha script correctly', () => {
		const CaptchaScript = recaptcha.getCaptchaScript();
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.src).toBe(`https://www.google.com/recaptcha/api.js?render=${config.RECAPTCHA_SITE_KEY}`);
	});

	it('renders captcha form element correctly', () => {
		const CaptchaFormElement = recaptcha.getCaptchaFormElement();
		const { container } = render(<CaptchaFormElement />);
		const inputTag = container.querySelector('input[type="hidden"]');
		expect(inputTag).not.toBeNull();
	});
});
