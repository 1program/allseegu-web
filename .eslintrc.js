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
  },
};
