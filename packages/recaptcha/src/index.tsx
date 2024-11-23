export * from './Captcha';
export * from './Factory';
export * from './Type';

// default export so that core factory can use it directly
import { ReCaptchaFactory } from './Factory';
export default ReCaptchaFactory;
