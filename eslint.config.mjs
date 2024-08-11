import globals from "globals";
import pluginJs from "@eslint/js";
import path from "path";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        node: {
          paths: [path.resolve("./src")],
        },
      },
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
  pluginJs.configs.recommended,
];
