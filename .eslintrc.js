module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:square/react',
    'plugin:square/typescript',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: "./tsconfig.json",
  },
  plugins: [
    'square',
  ],
  rules: {
    // TS supports declaration-only constructors with no body
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",

    // Square expects kebab-case so we need to override with PascalCase and camelCase
    'unicorn/filename-case': ['error', {cases: { pascalCase: true, camelCase: true}}],
    'filenames/match-regex': 'off', // duplicate of unicorn/filename-case

    'func-style': "off",
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        'no-empty-pattern': 'off',
         /**
         * Disabling this rule for `.ts` files because, it throws an error for
         * exporting interfaces, and we can safely disable it since TypeScript
         * will fail to compile with undefined vars, more info:
         * https://github.com/typescript-eslint/typescript-eslint/issues/342
         * https://github.com/eslint/typescript-eslint-parser/issues/437#issuecomment-435526531
         */
        'no-undef': 'off'
      }
    }
  ]
};
