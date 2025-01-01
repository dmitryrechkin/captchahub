import type { CaptchaFactoryInterface, CaptchaInterface } from '@captchahub/core';
import type { TypeReCaptchaConfig } from '../Type';
import { ReCaptcha } from '../Captcha';

/**
 * Interface representing an captcha provider factory.
 */
export class ReCaptchaFactory implements CaptchaFactoryInterface<TypeReCaptchaConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeReCaptchaConfig} config - The configuration object for the captcha provider.
	 * @returns {CaptchaInterface} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	public create(config: TypeReCaptchaConfig): CaptchaInterface
	{
		return new ReCaptcha(config);
	}
}
