import type { CaptchaFactoryInterface, CaptchaInterface } from '../Interface';
import type { TypeBaseConfig } from '../Type';
import { CaptchaFactoryRegistry } from '../Registry';

export class CaptchaFactory implements CaptchaFactoryInterface<TypeBaseConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeConfig} config - The configuration object for the email provider.
	 * @returns {CaptchaInterface} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	public create(config: TypeBaseConfig): CaptchaInterface
	{
		const factoryConstructor = CaptchaFactoryRegistry.getCaptchaFactory(config.CAPTCHA_PROVIDER ?? 'unknown');
		const factory = new factoryConstructor();

		return factory.create(config);
	}
}
