/* eslint-disable */
// @ts-nocheck
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        "prefer-const": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-explicit-any": 0,

        "node/exports-style": ["error", "exports"],
        "node/file-extension-in-import": 0,
        "node/no-unsupported-features/es-syntax": 0,

        "node/no-missing-import": [
            "error",
            {
                tryExtensions: [".js", ".json", ".ts", ".tsx"],
            },
        ],
    },
}
