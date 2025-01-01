import type { CaptchaFactoryInterface, CaptchaInterface } from '@captchahub/core';
import type { TypeHCaptchaConfig } from '../Type';
import { HCaptcha } from '../Captcha';

/**
 * Interface representing an captcha provider factory.
 */
export class HCaptchaFactory implements CaptchaFactoryInterface<TypeHCaptchaConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeHCaptchaConfig} config - The configuration object for the captcha provider.
	 * @returns {CaptchaInterface} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	public create(config: TypeHCaptchaConfig): CaptchaInterface
	{
		return new HCaptcha(config);
	}
}
