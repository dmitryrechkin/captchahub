import type { TypeBaseConfig } from '@captchahub/core';

export interface TypeHCaptchaConfig extends TypeBaseConfig
{
	// eslint-disable-next-line @typescript-eslint/naming-convention
	HCAPTCHA_SECRET_KEY?: string;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	HCAPTCHA_SITE_KEY?: string;
}
