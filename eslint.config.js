import perfectionistLineLength from 'eslint-plugin-perfectionist/configs/recommended-line-length'
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from 'eslint-plugin-perfectionist';
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import path from "path";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
});

// noinspection JSUnusedGlobalSymbols
export default [
  ...compat.extends("airbnb-base"),
  perfectionistLineLength,
  eslintConfigPrettier,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    ignores:
      [
        "**/*.config.js",
        "node_modules/*",
      ],
    plugins: {
      perfectionist,
    },
    rules: {
      semi: "error",
      'perfectionist/sort-interfaces': 'error',
    },
  }
];
