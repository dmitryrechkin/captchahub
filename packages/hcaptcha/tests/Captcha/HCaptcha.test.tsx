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
		const CaptchaScript = hcaptcha.getCaptchaScript({'async': false});
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.src).toBe('https://js.hcaptcha.com/1/api.js');
		expect(scriptTag?.hasAttribute('async')).toBe(false);
		expect(scriptTag?.hasAttribute('defer')).toBe(true);
	});

	it('renders captcha script with custom attributes', () => {
		const customAttributes = {
			'data-astro-rerun': 'true',
			'data-custom': 'value',
			'async': false
		};
		const CaptchaScript = hcaptcha.getCaptchaScript(customAttributes);
		const { container } = render(<CaptchaScript />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.getAttribute('data-astro-rerun')).toBe('true');
		expect(scriptTag?.getAttribute('data-custom')).toBe('value');
	});

	it('renders captcha form element correctly', () => {
		const CaptchaFormElement = hcaptcha.getCaptchaFormElement();
		const { container } = render(<CaptchaFormElement />);
		const inputTag = container.querySelector('input[type="hidden"]');
		expect(inputTag).not.toBeNull();
	});

	it('renders captcha form element with custom script attributes', () => {
		const customAttributes = {
			'data-astro-rerun': 'true',
			'data-custom': 'value'
		};
		const CaptchaFormElement = hcaptcha.getCaptchaFormElement(customAttributes);
		const { container } = render(<CaptchaFormElement />);
		const scriptTag = container.querySelector('script');
		expect(scriptTag).not.toBeNull();
		expect(scriptTag?.getAttribute('data-astro-rerun')).toBe('true');
		expect(scriptTag?.getAttribute('data-custom')).toBe('value');
		expect(scriptTag?.innerHTML).toContain('window[\'hcaptcha_');
	});
});
