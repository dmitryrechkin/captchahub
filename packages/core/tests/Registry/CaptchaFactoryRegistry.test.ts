import { describe, it, expect, beforeEach } from 'vitest';
import { CaptchaFactoryRegistry } from '../../src/Registry/CaptchaFactoryRegistry';
import type { CaptchaFactoryInterface } from '../../src/Interface';
import type { CaptchaFactoryConstructor, TypeBaseConfig } from '../../src/Type';
import { TurnstileFactory } from '../../../turnstile/src/Factory';
import { ReCaptchaFactory } from '../../../recaptcha/src/Factory';

class MockCaptchaFactory implements CaptchaFactoryInterface<TypeBaseConfig>
{
	create(): any 
	{
		return {};
	}
}

const mockFactoryConstructor: CaptchaFactoryConstructor<CaptchaFactoryInterface<TypeBaseConfig>, TypeBaseConfig> = class MockFactory implements CaptchaFactoryInterface<TypeBaseConfig>
{
	constructor()
	{
		return new MockCaptchaFactory();
	}
	create(): any
	{
		return {};
	}
};

describe('CaptchaFactoryRegistry', () => {
	beforeEach(() => {
		// Clear the registry before each test
		(CaptchaFactoryRegistry as any).captchaFactories = {};
		CaptchaFactoryRegistry.registerCaptchaFactory('turnstile', TurnstileFactory);
		CaptchaFactoryRegistry.registerCaptchaFactory('recaptcha', ReCaptchaFactory);
	});

	it('should register a captcha factory', () => {
		CaptchaFactoryRegistry.registerCaptchaFactory('test-provider', mockFactoryConstructor);
		expect((CaptchaFactoryRegistry as any).captchaFactories['test-provider']).toBe(mockFactoryConstructor);
	});

	it('should get a captcha factory', () => {
		CaptchaFactoryRegistry.registerCaptchaFactory('test-provider', mockFactoryConstructor);
		const factory = CaptchaFactoryRegistry.getCaptchaFactory('test-provider');
		expect(factory).toBe(mockFactoryConstructor);
	});

	it('should throw an error if no factory is found', () => {
		expect(() => CaptchaFactoryRegistry.getCaptchaFactory('non-existent-provider')).toThrowError('No captcha factory found for the provider "non-existent-provider".');
	});
});
