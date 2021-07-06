module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-self-closing': ['warn', {
      html: { normal: 'never', void: 'always' },
    }],
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/extensions': ['error', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never', vue: 'always',
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules'],
      },
    },
  },
};
