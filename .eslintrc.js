module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser:  'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "semi": ["error", "always"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/camelcase": ["error", {properties: "never"}],
    "max-len": ["error", { "code": 90 }]
  }
}