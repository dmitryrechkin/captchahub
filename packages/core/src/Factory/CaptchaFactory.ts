import type { CaptchaInterface } from '../Interface';
import type { CaptchaFactoryInterface } from '../Interface';
import type { TypeBaseConfig } from '../Type';

/**
 * Interface representing an captcha provider factory.
 */
export class CaptchaFactory implements CaptchaFactoryInterface<TypeBaseConfig>
{
	/**
	 * Creates an captcha based on the provided configuration.
	 *
	 * @param {TypeConfig} config - The configuration object for the email provider.
	 * @returns {Promise<CaptchaInterface>} - An captcha instance.
	 * @throws {Error} - Throws an error when requested provider captcha can't be created.
	 */
	public async create(config: TypeBaseConfig): Promise<CaptchaInterface>
	{
		try
		{
			const providerName = config.CAPTCHA_PROVIDER ?? 'core';
			const packageName = '@captchahub/' + providerName;

			// Dynamically import the package and access the default export
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const ProviderModule = await import(packageName);
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const Factory = ProviderModule.default;

			// we need to check if Factory has the create method, required by the EmailProviderFactoryInterface
			if (typeof Factory !== 'function' || !('create' in Factory.prototype))
			{
				throw new Error('The provider module does not implement the required interface.');
			}

			// Instantiate the factory and create the captcha
			return new Factory().create(config as any);
		}
		catch (error)
		{
			throw new Error(`Failed to create a captcha for the provider "${config.CAPTCHA_PROVIDER}". Message: ${(error as Error).message}`);
		}
	}
}
