# CaptchaHub Monorepo

**CaptchaHub is a monorepo that provides a unified collection of integrations with various captcha providers.** This repository serves as a central hub for managing and implementing captcha solutions across different web applications, ensuring a consistent and streamlined approach to captcha integration. It is designed to work seamlessly in nodeless (serverless) environments, making it ideal for modern web applications.

## Supported Captcha Providers

The CaptchaHub repository supports several captcha providers, including:

- **Turnstile**: A captcha solution that focuses on user experience and security.
- **HCaptcha**: A privacy-focused captcha service.
- **ReCaptcha**: A widely used captcha service by Google.

### Adding New Providers

To add a new captcha provider, you can implement the `CaptchaInterface`. Here’s a brief example of how to implement a new provider:

1. **Create a New Folder**: Create a new folder for your provider (e.g., `packages/myprovider`).
2. **Implement the Interface**: Create a class that implements the `CaptchaInterface`. This class should handle the logic for verifying captchas and rendering the captcha elements.

   Example:
   ```typescript
   import type { CaptchaInterface } from '@captchahub/core';

   export class MyProviderCaptcha implements CaptchaInterface {
       async verifyCaptcha(formFieldValues: Record<string, any>): Promise<boolean> {
           // Implement the logic to verify the captcha
       }

       getCaptchaScript(): React.FC {
           // Return the captcha script as a React component
       }

       getCaptchaFormElement(): React.FC {
           // Return the captcha form element as a React component
       }
   }
   ```

## Installation

Install the package using pnpm:

```bash
pnpm add @captchahub/core
```

## Usage

### Getting the Captcha Script

The `getCaptchaScript` function is used to retrieve the captcha script for rendering. It can be used as follows:

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

The `getCaptchaFormElement` function is used to retrieve the captcha form element for rendering. It can be used as follows:

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

The `verifyCaptcha` function is used to verify the captcha response. It can be used as follows:

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

The CaptchaHub is designed to be extensible. You can create new captcha providers by implementing the `CaptchaInterface`. This allows you to add support for additional captcha services in the future.

## Rationale

The CaptchaHub is designed to provide a consistent and extensible foundation for managing captcha workflows in TypeScript applications. By using well-defined interfaces and tools, developers can easily integrate captcha capabilities into their web applications.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can format code using:

```bash
pnpm format
```

You can run unit tests using:

```bash
pnpm test
