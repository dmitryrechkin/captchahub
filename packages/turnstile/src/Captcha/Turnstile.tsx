import type { CaptchaInterface } from '@captchahub/core';
import type { TypeTurnstileConfig } from '../Type/Types';
import React from 'react';

export class Turnstile implements CaptchaInterface
{
	/**
	 * Constructor
	 * @param {TypeTurnstileConfig} config - Configuration
	 */
	public constructor(private readonly config: TypeTurnstileConfig) {}

	/**
	 * Verify captcha
	 * @param {Record<string, any>} formFieldValues - Form field values
	 * @returns {Promise<boolean>} - Returns true if captcha is verified
	 */
	public async verifyCaptcha(formFieldValues: Record<string, any>): Promise<boolean>
	{
		if (!this.config.TURNSTILE_SECRET_KEY)
		{
			return true;
		}

		const token = formFieldValues['cf-turnstile-response'];

		if (!token)
		{
			return false;
		}

		try
		{
			const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					secret: this.config.TURNSTILE_SECRET_KEY,
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
				src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
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
		return () => (
			<div
				className="cf-turnstile"
				data-sitekey={this.config.TURNSTILE_SITE_KEY}
			/>
		);
	}
}
