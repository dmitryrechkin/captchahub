export * from './Captcha';
export * from './Factory';
export * from './Type';

// default export so that core factory can use it directly
import { HCaptchaFactory } from './Factory';
export default HCaptchaFactory;
