import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Optional: specify a different cwd if needed
  // cwd: __dirname,
});

const eslintConfig = [
  // Include configurations from 'next/core-web-vitals' and 'next/typescript'
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a new configuration object to override specific rules
  {
    // You could add 'files: ["**/*.ts", "**/*.tsx"]' here if you only want
    // this rule override to apply to TypeScript files, but disabling
    // no-unused-vars is typically done globally or per file type.
    rules: {
      // Disable the rule for unused variables from TypeScript ESLint
      "@typescript-eslint/no-unused-vars": "off",
      // You might also want to disable the base ESLint version if you're
      // using the TS version provided by the plugin
      // "no-unused-vars": "off"
    }
  }
];

export default eslintConfig;