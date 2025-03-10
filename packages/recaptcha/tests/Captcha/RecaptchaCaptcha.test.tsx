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
		const CaptchaScript = recaptcha.getCaptchaScript({'async': false});
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.src).toBe(`https://www.google.com/recaptcha/api.js?render=${config.RECAPTCHA_SITE_KEY}`);
		expect(scriptTag?.hasAttribute('async')).toBe(false);
		expect(scriptTag?.hasAttribute('defer')).toBe(true);
	});

	it('renders captcha script with custom attributes', () => {
		const customAttributes = {
			'data-astro-rerun': 'true',
			'data-custom': 'value',
			'async': false
		};
		const CaptchaScript = recaptcha.getCaptchaScript(customAttributes);
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.getAttribute('data-astro-rerun')).toBe('true');
		expect(scriptTag?.getAttribute('data-custom')).toBe('value');
	});

	it('renders captcha form element correctly', () => {
		const CaptchaFormElement = recaptcha.getCaptchaFormElement();
		const { container } = render(<CaptchaFormElement />);
		const inputTag = container.querySelector('input[type="hidden"]');
		expect(inputTag).not.toBeNull();
	});

	it('renders captcha form element with custom script attributes', () => {
		const customAttributes = {
			'data-astro-rerun': 'true',
			'data-custom': 'value'
		};
		const CaptchaFormElement = recaptcha.getCaptchaFormElement(customAttributes);
		const { container } = render(<CaptchaFormElement />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.getAttribute('data-astro-rerun')).toBe('true');
		expect(scriptTag?.getAttribute('data-custom')).toBe('value');
		expect(scriptTag?.innerHTML).toContain('document.addEventListener');
	});
});
