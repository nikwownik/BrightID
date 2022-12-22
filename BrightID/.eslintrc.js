module.exports = {
  root: true,
  plugins: ['import', 'react', 'jsx-a11y'],
  extends: [
    'airbnb',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['import', 'jsx-a11y', '@typescript-eslint'],
      env: { browser: true, es6: true, node: true },
      settings: {
        'import/resolver': {
          alias: {
            map: [['@', './src']],
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'off',
    'arrow-parens': 'off',
    'global-require': 'off',
    'no-use-before-define': 'off',
    'no-prototype-builtins': 'off',
    'function-paren-newline': 'off',
    'class-methods-use-this': 'warn',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'warn',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/require-default-props': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/no-unused-state': 'warn',
    'react/function-component-definition': 'off',
    'react/sort-comp': 'off',
    'consistent-return': 'off',
    'no-alert': 'off',
    'no-else-return': 'off',
    'no-shadow': 'off',
    'import/no-named-as-default': 'off',
    'prefer-const': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-var': 'off',
    'vars-on-top': 'off',
    'block-scoped-var': 'off',
    'flowtype/space-after-type-colon': 'off',
    'no-await-in-loop': 'off',
    'react-native/no-inline-styles': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        // tests are allowed to import from devDependencies
        devDependencies: ['**/*.test.tsx'],
      },
    ],

    // 'sort-keys': [
    //   'error',
    //   'asc',
    //   {
    //     caseSensitive: false,
    //     natural: true,
    //     minKeys: 2,
    //   },
    // ],
  },
  globals: {
    __DEV__: 'readonly',
  },
};
