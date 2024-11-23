import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Turnstile } from '../../src';
import React from 'react';

describe('Turnstile Class', () => {
	const config = {
		CAPTCHA_PROVIDER: 'turnstile',
		TURNSTILE_SECRET_KEY: 'test_secret_key',
		TURNSTILE_SITE_KEY: 'test_site_key',
	};

	const turnstile = new Turnstile(config);

	it('verifies captcha successfully', async () => {
		// Mock the fetch API
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ success: true }),
			})
		) as unknown as typeof fetch;

		const result = await turnstile.verifyCaptcha({ 'cf-turnstile-response': 'test_token' });
		expect(result).toBe(true);
	});

	it('fails to verify captcha with no token', async () => {
		const result = await turnstile.verifyCaptcha({});
		expect(result).toBe(false);
	});

	it('renders captcha script correctly', () => {
		const CaptchaScript = turnstile.getCaptchaScript();
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.src).toBe('https://challenges.cloudflare.com/turnstile/v0/api.js');
	});

	it('renders captcha form element correctly', () => {
		const CaptchaFormElement = turnstile.getCaptchaFormElement();
		const { container } = render(<CaptchaFormElement />);
		const divTag = container.querySelector('.cf-turnstile');
		expect(divTag).not.toBeNull();
	});
});