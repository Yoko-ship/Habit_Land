import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
]);
