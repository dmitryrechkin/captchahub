import type { CaptchaInterface } from '@captchahub/core';
import type { TypeHCaptchaConfig } from '../Type/Types';
import React from 'react';

export class HCaptcha implements CaptchaInterface
{
	/**
	 * Constructor
	 * @param {TypeHCaptchaConfig} config - Configuration
	 */
	public constructor(private readonly config: TypeHCaptchaConfig) {}

	/**
	 * Verify captcha
	 * @param {Record<string, any>} formFieldValues - Form field values
	 * @returns {Promise<boolean>} - Returns true if captcha is verified
	 */
	public async verifyCaptcha(formFieldValues: Record<string, any>): Promise<boolean>
	{
		if (!this.config.HCAPTCHA_SECRET_KEY)
		{
			return true;
		}

		const token = formFieldValues['h-captcha-response'];

		if (!token)
		{
			return false;
		}

		try
		{
			const response = await fetch('https://api.hcaptcha.com/siteverify', {
				method: 'POST',
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					secret: this.config.HCAPTCHA_SECRET_KEY,
					response: token
				})
			});

			const data = await response.json();
			return data.success === true;
		}
		catch (error)
		{
			return false;
		}
	}

	/**
	 * Get captcha script
	 * @param {Record<string, string>} [scriptAttributes] - Optional script attributes to add to the script tag
	 * @returns {React.FC} - Returns captcha script
	 */
	public getCaptchaScript(scriptAttributes?: Record<string, string>): React.FC
	{
		return () =>
		{
			const scriptProps = {
				src: 'https://js.hcaptcha.com/1/api.js',
				async: true,
				defer: true,
				...scriptAttributes
			};

			return <script {...scriptProps} />;
		};
	}

	/**
	 * Get captcha form element
	 * @returns {React.FC} - Returns captcha form element
	 */
	public getCaptchaFormElement(): React.FC
	{
		return () =>
		{
			const captchaRandomElementId = Math.random().toString(36).substring(2);

			return (
				<>
					<div
						className="h-captcha"
						data-sitekey={this.config.HCAPTCHA_SITE_KEY}
						data-callback={`hcaptcha_${captchaRandomElementId}`}
					></div>
					<input type="hidden" id={captchaRandomElementId} name="h-captcha-response" />
					<script
						dangerouslySetInnerHTML={{
							// eslint-disable-next-line @typescript-eslint/naming-convention
							__html: `
								window['hcaptcha_${captchaRandomElementId}'] = function(token) {
									document.getElementById('${captchaRandomElementId}').value = token;
								};
							`
						}}
					></script>
				</>
			);
		};
	}
}
