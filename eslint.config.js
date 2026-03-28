const nextConfig = require("eslint-config-next/core-web-vitals");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  // Next.js core-web-vitals flat config (includes next, react, react-hooks, @typescript-eslint)
  ...nextConfig,

  // Disable style rules that conflict with prettier
  prettierConfig,

  // Additional rules for TypeScript files (reuse plugins already declared by next config)
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      ...tsPlugin.configs["flat/recommended"].rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "error",
    },
  },

  // JS files: prettier rules only
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "error",
    },
  },
];
