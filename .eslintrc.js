/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": ["error", "app/"],
    "react/jsx-sort-props": [
      1,
      {
        noSortAlphabetically: true,
        reservedFirst: true,
        shorthandFirst: true,
        multiline: "last",
      },
    ],
  },
};
