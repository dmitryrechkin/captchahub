export interface CaptchaInterface
{
	/**
	 * Verify captcha
	 * @param {Record<string, any>} formFieldValues - Form field values
	 * @returns {Promise<boolean>} - Returns true if captcha is verified
	 */
	verifyCaptcha(formFieldValues: Record<string, any>): Promise<boolean>;

	/**
	 * Get captcha script
	 * @param {Record<string, unknown>} [scriptAttributes] - Optional script attributes to add to the script tag
	 * @returns {React.FC} - Returns captcha script
	 */
	getCaptchaScript(scriptAttributes?: Record<string, unknown>): React.FC;

	/**
	 * Get captcha form element
	 * @param {Record<string, unknown>} [scriptAttributes] - Optional script attributes to add to the script tag
	 * @returns {React.FC} - Returns captcha form element
	 */
	getCaptchaFormElement(scriptAttributes?: Record<string, unknown>): React.FC;
}
