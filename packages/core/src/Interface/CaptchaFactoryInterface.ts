import type { TypeBaseConfig } from '../Type/Types';
import type { CaptchaInterface } from './CaptchaInterface';

/**
 * Interface representing an captcha provider factory.
 */
export interface CaptchaFactoryInterface<TypeConfig extends TypeBaseConfig = TypeBaseConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeConfig} config - The configuration object for the captcha provider.
	 * @returns {Promise<CaptchaInterface>} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	create(config: TypeConfig): Promise<CaptchaInterface>;
}
