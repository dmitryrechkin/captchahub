import type { CaptchaInterface } from '@captchahub/core';
import type { TypeReCaptchaConfig } from '../Type/Types';
import React from 'react';

export class ReCaptcha implements CaptchaInterface
{
	/**
	 * Constructor
	 * @param {TypeReCaptchaConfig} config - Configuration
	 */
	public constructor(private readonly config: TypeReCaptchaConfig) {}

	/**
	 * Verify captcha
	 * @param {Record<string, any>} formFieldValues - Form field values
	 * @returns {Promise<boolean>} - Returns true if captcha is verified
	 */
	public async verifyCaptcha(formFieldValues: Record<string, any>): Promise<boolean>
	{
		if (!this.config.RECAPTCHA_SECRET_KEY)
		{
			return true;
		}

		// Use the specified token field name or default to 'g-recaptcha-response'
		const token = formFieldValues['g-recaptcha-response'];

		// If no token is found, return false immediately
		if (!token)
		{
			return false;
		}

		try
		{
			// Send a POST request to Google's reCAPTCHA API to verify the token
			const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
				method: 'POST',
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					secret: this.config.RECAPTCHA_SECRET_KEY,
					response: token
				})
			});

			// Parse the response from Google
			const data = await response.json();
			// Return true if verification is successful, otherwise false
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
				src: `https://www.google.com/recaptcha/api.js?render=${this.config.RECAPTCHA_SITE_KEY}`,
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
					<input type="hidden" id={captchaRandomElementId} name="g-recaptcha-response" />
					<script
						dangerouslySetInnerHTML={{
							// eslint-disable-next-line @typescript-eslint/naming-convention
							__html: `
								document.addEventListener('DOMContentLoaded', function() {
									const captchaTokenElement = document.getElementById('${captchaRandomElementId}');
									const formElement = captchaTokenElement.closest('form');
									formElement.addEventListener('beforeSubmit', function(event) {
										const captchaPromise = grecaptcha.execute('${this.config.RECAPTCHA_SITE_KEY}', { action: 'submit' }).then(token => {
											console.log('Token set successfully');
											document.getElementById('${captchaRandomElementId}').value = token;
											return 'Token set successfully';
										});
										event.detail.promises = event.detail.promises || [];
										event.detail.promises.push(captchaPromise);
									});
								});
							`
						}}
					></script>
				</>
			);
		};
	}
}
