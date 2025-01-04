import type { TypeBaseConfig } from '../Type';
import { CaptchaFactory } from '../Factory';

/**
 * Gets the captcha script for the provided configuration.
 *
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @param {Record<string, string>} [scriptAttributes] - Optional script attributes to add to the script tag
 * @returns {React.FC} - The captcha script.
 */
export const getCaptchaScript = (
	config: TypeBaseConfig,
	scriptAttributes?: Record<string, string>
): React.FC =>
	(new CaptchaFactory()).create(config).getCaptchaScript(scriptAttributes);
