export * from './Captcha';
export * from './Factory';
export * from './Type';

import { CaptchaFactoryRegistry } from '@captchahub/core';
import { HCaptchaFactory } from './Factory';

CaptchaFactoryRegistry.registerCaptchaFactory('hcaptcha', HCaptchaFactory);

// default export so that core factory can use it directly
export default HCaptchaFactory;
