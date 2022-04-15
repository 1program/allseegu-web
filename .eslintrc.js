module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "@vue/prettier",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 참조: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/302
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        components: ["VLabel"],
        controlComponents: ["VInput"],
        required: {
          some: ["nesting", "id"],
        },
        allowChildren: false,
      },
    ],
    camelcase: "off",

    // enum no shadow 오류 해결
    // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "import/prefer-default-export": "off",
    "no-undef": "off",
    "vuejs-accessibility/heading-has-content": "off",
  },

  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
