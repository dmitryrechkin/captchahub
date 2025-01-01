# CaptchaHub Turnstile

**CaptchaHub Turnstile is a TypeScript library that provides integration with the Turnstile captcha service, allowing for seamless captcha implementation within your applications.** This package extends the core functionality of CaptchaHub to support Turnstile as a captcha provider.

## Installation

Install the package using pnpm:

```bash
pnpm add @captchahub/core
pnpm add @captchahub/turnstile
```

## Features

- **User Experience Focused**: Turnstile is designed to enhance user experience while ensuring security.
- **Customizable**: Easily customize the appearance and behavior of the captcha.
- **Requires Core Package**: This package requires the `@captchahub/core` package for functionality.

## Usage

### Getting the Captcha Script

The `getCaptchaScript` function can be used as follows:

```typescript
import { getCaptchaScript } from '@captchahub/core';
// Import the provider package to trigger self-registration
import '@captchahub/turnstile';

const config = {
    CAPTCHA_PROVIDER: 'turnstile',
    TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY, // Your Turnstile site key
};

const CaptchaComponent = async () => {
    const CaptchaScript = getCaptchaScript(config);

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
// Import the provider package to trigger self-registration
import '@captchahub/turnstile';

const config = {
    CAPTCHA_PROVIDER: 'turnstile',
    TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY, // Your Turnstile site key
};

const CaptchaFormComponent = async () => {
    const CaptchaFormElement = getCaptchaFormElement(config);

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
// Import the provider package to trigger self-registration
import '@captchahub/turnstile';

const config = {
    CAPTCHA_PROVIDER: 'turnstile',
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY, // Your Turnstile secret key
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

Configuration for the Turnstile provider can be defined in a configuration object passed to the factory when creating the captcha instance. The configuration object must include the `CAPTCHA_PROVIDER` property to specify which captcha provider to use. Additionally, you will need to provide the `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for proper functionality.

## Extensibility

The `@captchahub/turnstile` package is designed to be extensible. You can create new captcha providers by implementing the `CaptchaInterface`. This allows you to add support for additional captcha services in the future.

## Rationale

The `@captchahub/turnstile` package is designed to provide integration with the Turnstile service for managing captcha workflows in TypeScript applications. By using the core package, developers can easily integrate Turnstile capabilities into their web applications.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can format code using:

```bash
pnpm format
```

You can run unit tests using:

```bash
pnpm test
