import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
