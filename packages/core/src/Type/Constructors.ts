import type { CaptchaFactoryInterface } from '../Interface';
import type { TypeBaseConfig } from './Types';

export type CaptchaFactoryConstructor<
	T extends CaptchaFactoryInterface<C>,
	C extends TypeBaseConfig = TypeBaseConfig
> = new () => T;
