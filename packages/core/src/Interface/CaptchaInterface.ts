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
	 * @param {Record<string, string>} [scriptAttributes] - Optional script attributes to add to the script tag
	 * @returns {React.FC} - Returns captcha script
	 */
	getCaptchaScript(scriptAttributes?: Record<string, string>): React.FC;

	/**
	 * Get captcha form element
	 * @returns {React.FC} - Returns captcha form element
	 */
	getCaptchaFormElement(): React.FC;
}
