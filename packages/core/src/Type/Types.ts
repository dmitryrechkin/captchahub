// Base configuration for all configuration types, the expectation is that each provider will have its own configuration type that extends this.
export interface TypeBaseConfig
{
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CAPTCHA_PROVIDER: string;
}
