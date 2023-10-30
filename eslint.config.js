import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
});
import eslintConfigPrettier from "eslint-config-prettier";
// noinspection JSUnusedGlobalSymbols
export default [
  ...compat.extends("airbnb-base"),
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
        "!**/eslint.config.js",
        "node_modules/*",
      ],
    rules: {
      semi: "error"
    },
  }
];
