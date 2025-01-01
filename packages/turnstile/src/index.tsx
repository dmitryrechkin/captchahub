export * from './Captcha';
export * from './Factory';
export * from './Type';

import { CaptchaFactoryRegistry } from '@captchahub/core';
import { TurnstileFactory } from './Factory';

CaptchaFactoryRegistry.registerCaptchaFactory('turnstile', TurnstileFactory);

// default export so that core factory can use it directly
export default TurnstileFactory;
