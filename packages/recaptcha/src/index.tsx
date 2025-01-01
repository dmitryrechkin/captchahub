export * from './Captcha';
export * from './Factory';
export * from './Type';

import { CaptchaFactoryRegistry } from '@captchahub/core';
import { ReCaptchaFactory } from './Factory';

CaptchaFactoryRegistry.registerCaptchaFactory('recaptcha', ReCaptchaFactory);

// default export so that core factory can use it directly
export default ReCaptchaFactory;
