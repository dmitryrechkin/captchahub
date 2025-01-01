import type { CaptchaFactoryInterface, CaptchaInterface } from '@captchahub/core';
import type { TypeTurnstileConfig } from '../Type';
import { Turnstile } from '../Captcha';

/**
 * Interface representing an captcha provider factory.
 */
export class TurnstileFactory implements CaptchaFactoryInterface<TypeTurnstileConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeTurnstileConfig} config - The configuration object for the captcha provider.
	 * @returns {CaptchaInterface} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	public create(config: TypeTurnstileConfig): CaptchaInterface
	{
		return new Turnstile(config);
	}
}
