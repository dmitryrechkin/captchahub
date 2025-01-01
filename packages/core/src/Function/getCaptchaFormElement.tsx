import type { TypeBaseConfig } from '../Type';
import { CaptchaFactory } from '../Factory';

/**
 * Gets the captcha form element for the provided configuration.
 *
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @returns {React.FC} - The captcha form element.
 */
export const getCaptchaFormElement = (config: TypeBaseConfig): React.FC =>
	(new CaptchaFactory()).create(config).getCaptchaFormElement();
