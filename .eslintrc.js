/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ["effector"],
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:effector/react",
  ],
  rules: {
    "import/no-named-as-default": "off",
    "import/no-anonymous-default-export": "off",
    'react/display-name': 'off',
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      }
    ],
  }
}
