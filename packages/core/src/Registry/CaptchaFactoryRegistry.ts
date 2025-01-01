import type { CaptchaFactoryInterface } from '../Interface';
import type { CaptchaFactoryConstructor, TypeBaseConfig } from '../Type';

export class CaptchaFactoryRegistry
{
	private static captchaFactories: Record<string, CaptchaFactoryConstructor<CaptchaFactoryInterface<TypeBaseConfig>, TypeBaseConfig>> = {};

	/**
	 * Register captcha factory for a provider.
	 *
	 * @param {string} provider - The unique identifier for the captcha provider factory
	 * @param {CaptchaFactoryConstructor} captchaFactoryConstructor - The captcha factory constructor
	 * @returns {void}
	 */
	public static registerCaptchaFactory(
		provider: string,
		captchaFactoryConstructor: CaptchaFactoryConstructor<CaptchaFactoryInterface<TypeBaseConfig>, TypeBaseConfig>
	): void
	{
		this.captchaFactories[provider] = captchaFactoryConstructor;
	}

	/**
	 * Get a captcha factory by provider.
	 *
	 * @param {string} provider - The unique identifier of the captcha provider factory
	 * @returns {CaptchaFactoryConstructor} The captcha factory constructor
	 * @throws {Error} If no factory is found for the given provider
	 */
	public static getCaptchaFactory(provider: string): CaptchaFactoryConstructor<CaptchaFactoryInterface<TypeBaseConfig>, TypeBaseConfig>
	{
		const factoryClass = this.captchaFactories[provider];
		if (!factoryClass)
		{
			throw new Error(`No captcha factory found for the provider "${provider}".`);
		}

		return factoryClass;
	}
}
