import type { TypeBaseConfig } from '../Type';
import { CaptchaFactory } from '../Factory';

/**
 * Gets the captcha form element for the provided configuration.
 *
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @returns {React.FC} - The captcha form element.
 */
/**
 * Gets the captcha form element for the provided configuration.
 *
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @param {Record<string, string>} [scriptAttributes] - Optional script attributes to add to the script tag
 * @returns {React.FC} - The captcha form element.
 */
export const getCaptchaFormElement = (
	config: TypeBaseConfig,
	scriptAttributes?: Record<string, string>
): React.FC =>
	(new CaptchaFactory()).create(config).getCaptchaFormElement(scriptAttributes);
