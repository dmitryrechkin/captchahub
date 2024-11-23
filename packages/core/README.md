# CaptchaHub Core

**CaptchaHub Core is a TypeScript library that serves as the foundational package for the CaptchaHub ecosystem, providing essential classes, interfaces, and tools for handling and processing captchas within web applications.** This package enables seamless integration with various captcha providers, including ReCaptcha, HCaptcha, and Turnstile, ensuring a consistent and streamlined approach to captcha implementation.

## Installation

Install the package using pnpm:

```bash
pnpm add @captchahub/core
```

## Features

- **Unified Integration**: CaptchaHub Core provides a unified interface for integrating multiple captcha providers.
- **Extensible**: Easily extend the core functionality to support additional captcha services.
- **Nodeless (Serverless) Support**: Designed to work seamlessly in nodeless (serverless) environments, making it ideal for modern web applications.

## Usage

### Getting the Captcha Script

The `getCaptchaScript` function can be used as follows:

```typescript
import { getCaptchaScript } from '@captchahub/core';

const config = {
    CAPTCHA_PROVIDER: 'your-provider', // Specify the captcha provider
    // Additional provider-specific configuration can go here
};

const CaptchaComponent = async () => {
    const CaptchaScript = (await getCaptchaScript(config)) as React.FC;

    return (
        <div>
            <CaptchaScript />
            {/* Additional form elements */}
        </div>
    );
};
```

### Getting the Captcha Form Element

The `getCaptchaFormElement` function can be used as follows:

```typescript
import { getCaptchaFormElement } from '@captchahub/core';

const config = {
    CAPTCHA_PROVIDER: 'your-provider', // Specify the captcha provider
    // Additional provider-specific configuration can go here
};

const CaptchaFormComponent = async () => {
    const CaptchaFormElement = (await getCaptchaFormElement(config)) as React.FC;

    return (
        <div>
            <CaptchaFormElement />
            {/* Additional form elements */}
        </div>
    );
};
```

### Verifying the Captcha

The `verifyCaptcha` function can be used as follows:

```typescript
import { verifyCaptcha } from '@captchahub/core';

const config = {
    CAPTCHA_PROVIDER: 'your-provider', // Specify the captcha provider
    // Additional provider-specific configuration can go here
};

const formFieldValues = {
    // Your form field values that need to be verified
};

const isValid = await verifyCaptcha(formFieldValues, config);
if (isValid) {
    console.log('Captcha verified successfully!');
} else {
    console.error('Captcha verification failed.');
}
```

### Configuration

Configuration for the captcha provider can be defined in a configuration object passed to the factory when creating the captcha instance. The configuration object must include the `CAPTCHA_PROVIDER` property to specify which captcha provider to use. Additional properties may be required depending on the specific provider.

## Extensibility

The CaptchaHub Core package is designed to be extensible. You can create new captcha providers by implementing the `CaptchaInterface`. This allows you to add support for additional captcha services in the future.

## Rationale

The CaptchaHub Core package is designed to provide a consistent and extensible foundation for managing captcha workflows in TypeScript applications. By using well-defined interfaces and tools, developers can easily integrate captcha capabilities into their web applications.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can format code using:

```bash
pnpm format
```

You can run unit tests using:

```bash
pnpm test
