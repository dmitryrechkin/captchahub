import type { TypeBaseConfig } from '@captchahub/core';

export interface TypeReCaptchaConfig extends TypeBaseConfig
{
	// eslint-disable-next-line @typescript-eslint/naming-convention
	RECAPTCHA_SECRET_KEY?: string;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	RECAPTCHA_SITE_KEY?: string;
}
