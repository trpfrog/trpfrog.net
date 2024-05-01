# `@trpfrog.net/config-typescript`

This package is a configuration package for the TypeScript compiler.

## How to use

Create a `tsconfig.json` file in the root of your project and extend the configuration provided by this package:

```json
{
  "extends": "@trpfrog.net/config-typescript/base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

This package provides following configurations:

- `base.json`: The base configuration for TypeScript.
- `react-library.json`: A configuration for a TypeScript project that uses React.
- `nextjs.json`: A configuration for a TypeScript project that uses Next.js.
- `hono.json`: A configuration for a TypeScript project that uses Hono.
