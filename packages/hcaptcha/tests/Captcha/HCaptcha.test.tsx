import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { HCaptcha } from '../../src';
import React from 'react';

describe('HCaptcha Class', () => {
	const config = {
		CAPTCHA_PROVIDER: 'hcaptcha',
		HCAPTCHA_SECRET_KEY: 'test_secret_key',
		HCAPTCHA_SITE_KEY: 'test_site_key',
	};

	const hcaptcha = new HCaptcha(config);

	it('verifies captcha successfully', async () => {
		// Mock the fetch API
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ success: true }),
			})
		) as unknown as typeof fetch;

		const result = await hcaptcha.verifyCaptcha({ 'h-captcha-response': 'test_token' });
		expect(result).toBe(true);
	});

	it('fails to verify captcha with no token', async () => {
		const result = await hcaptcha.verifyCaptcha({});
		expect(result).toBe(false);
	});

	it('renders captcha script correctly', () => {
		const CaptchaScript = hcaptcha.getCaptchaScript();
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.src).toBe('https://js.hcaptcha.com/1/api.js');
	});

	it('renders captcha form element correctly', () => {
		const CaptchaFormElement = hcaptcha.getCaptchaFormElement();
		const { container } = render(<CaptchaFormElement />);
		const inputTag = container.querySelector('input[type="hidden"]');
		expect(inputTag).not.toBeNull();
	});
});
