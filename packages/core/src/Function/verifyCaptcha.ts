import type { TypeBaseConfig } from '../Type';
import { CaptchaFactory } from '../Factory';

/**
 * Verifies the captcha response.
 *
 * @param {Record<string, any>} formFieldValues - The form field values to verify.
 * @param {TypeBaseConfig} config - The configuration object for the captcha provider.
 * @returns {Promise<boolean>} - Returns true if the captcha is verified.
 */
export const verifyCaptcha = async (formFieldValues: Record<string, any>, config: TypeBaseConfig): Promise<boolean> =>
	(await (new CaptchaFactory()).create(config)).verifyCaptcha(formFieldValues);
