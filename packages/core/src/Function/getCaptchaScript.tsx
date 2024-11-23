import type { TypeBaseConfig } from '../Type';
import { CaptchaFactory } from '../Factory';

/**
 * Gets the captcha script for the provided configuration.
 *
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @returns {Promise<React.FC>} - The captcha script.
 */
export const getCaptchaScript = async (config: TypeBaseConfig): Promise<React.FC> =>
	(await (new CaptchaFactory()).create(config)).getCaptchaScript();