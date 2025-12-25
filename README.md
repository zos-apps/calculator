# 🧮 Calculator

> Beautiful calculator with standard and scientific modes

Part of the [zOS Apps](https://github.com/zos-apps) ecosystem.

## Installation

```bash
npm install github:zos-apps/calculator
```

## Usage

```tsx
import App from '@zos-apps/calculator';

function MyApp() {
  return <App />;
}
```

## Package Spec

App metadata is defined in `package.json` under the `zos` field:

```json
{
  "zos": {
    "id": "ai.hanzo.calculator",
    "name": "Calculator",
    "icon": "🧮",
    "category": "utilities",
    "permissions": [],
    "installable": true
  }
}
```

## Version

v4.2.0

## License

MIT © Hanzo AI
