# Conventions and Best Practices

This document outlines the conventions and best practices for developing this TypeScript-based NPM SDK library. Adhering to these guidelines ensures code quality, consistency, and maintainability.

## TypeScript

### 1. Strict Type Checking
Enable strict type checking in `tsconfig.json` to catch common errors at compile time. This is a fundamental practice for writing robust TypeScript.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Naming Conventions
- **`PascalCase`** for classes, enums, and interfaces that are not simple type definitions.
  ```typescript
  class MorpherTradeSDK { /* ... */ }
  interface ContractPosition { /* ... */ }
  ```
- **`camelCase`** for variables, functions, and methods.
  ```typescript
  const myVariable = 'value';
  function myFunction() { /* ... */ }
  ```
- **`T` prefix** for type aliases and simple interfaces defining data structures.
  ```typescript
  type TAddress = `0x${string}`;
  type TMarketType = "stock" | "forex";
  interface TMarketDetail extends TMarket { /* ... */ }
  ```

### 3. Types and Interfaces
- Use `interface` for defining the shape of objects, especially when they can be extended.
- Use `type` for creating aliases for unions, intersections, primitives, and other complex types.

### 4. Avoid `any`
The `any` type bypasses TypeScript's type safety. Avoid it. If a type is truly unknown, use `unknown` and perform the necessary type checks before using the value.

### 5. Asynchronous Code
Use `async/await` for handling promises. It makes asynchronous code look and behave more like synchronous code, which improves readability and simplifies error handling.

### 6. Code Formatting and Linting
- Use **Prettier** for automatic code formatting to maintain a consistent style across the codebase.
- Use **ESLint** to statically analyse code to quickly find and fix problems.

## NPM SDK Library

### 1. API Design
- The public API surface should be minimal, clear, and intuitive.
- The main class (`MorpherTradeSDK`) should serve as the primary entry point for all SDK functionality.
- Methods should have descriptive names that clearly indicate their purpose.
- For functions with multiple arguments, use parameter objects to improve readability and make the API more extensible without introducing breaking changes.

### 2. Dependency Management
- **`dependencies`**: Packages required for the library to function at runtime.
- **`devDependencies`**: Packages used only for development and testing (e.g., `typescript`, `jest`, `eslint`).
- **`peerDependencies`**: Packages that the consuming application is expected to provide. This is crucial for SDKs to prevent version conflicts with the host application's dependencies (e.g., `viem`).

### 3. Versioning
Adhere strictly to **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`.
- `MAJOR`: For incompatible API changes.
- `MINOR`: For adding new, backward-compatible functionality.
- `PATCH`: For backward-compatible bug fixes.

### 4. Documentation
- **README.md**: A comprehensive guide covering the SDK's purpose, installation instructions, and clear usage examples for common scenarios.
- **JSDoc**: Add JSDoc comments to all public methods, types, and interfaces. This enables auto-generated documentation and provides excellent autocompletion and type information in code editors.
  ```typescript
  /**
   * Fetches the list of available markets.
   * @param options - The options to filter the market list.
   * @param options.type - Optional filter for market type.
   * @returns A promise that resolves to an array of markets.
   */
  async getMarketList({ type }: { type?: TMarketType }) {
    // ...
  }
  ```

### 5. Error Handling
- The SDK should throw custom, informative errors rather than exposing raw implementation-specific exceptions.
- Custom errors should extend the base `Error` class.
- Error messages should be clear and provide context to help users debug issues.

### 6. Testing
- Implement thorough unit tests for individual functions and methods to verify their correctness in isolation.
- Create integration tests to ensure that different parts of the SDK work together as expected.
- Strive for high test coverage to build confidence in the library's stability and reliability.

### 7. Bundling and Distribution
- Provide builds for different module systems (e.g., CommonJS, ES Modules) to support various environments.
- The `package.json` `main`, `module`, and `types` fields must point to the correct build artifacts.
- Minify production builds to reduce the file size and improve load times for web-based applications.

### 8. Changelog
Maintain a `CHANGELOG.md` file to document all notable changes for each release. This is essential for users to understand what has changed between versions and to facilitate smooth upgrades.
