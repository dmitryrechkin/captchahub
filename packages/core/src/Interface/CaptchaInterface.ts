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
	 * @returns {React.FC} - Returns captcha script
	 */
	getCaptchaScript(): React.FC;

	/**
	 * Get captcha form element
	 * @returns {React.FC} - Returns captcha form element
	 */
	getCaptchaFormElement(): React.FC;
}
