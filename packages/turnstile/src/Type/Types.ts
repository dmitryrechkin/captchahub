import type { TypeBaseConfig } from '@captchahub/core';

export interface TypeTurnstileConfig extends TypeBaseConfig
{
	// eslint-disable-next-line @typescript-eslint/naming-convention
	TURNSTILE_SECRET_KEY?: string;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	TURNSTILE_SITE_KEY?: string;
}
