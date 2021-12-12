module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'semi': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': ['error', { before: true }],
    'key-spacing': ['error'],
    'semi-spacing': ['error', { before: false, after: true }],
    'linebreak-style': ['error', 'unix'],
    'no-return-await': ['error'],
    'indent': ['error', 2],
    'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
    'no-multi-spaces': ['error'],
    'block-spacing': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'no-var': ['error'],
    'max-len': ['error', { 'code': 160 }],
    'prefer-destructuring': ['error', {
      'array': true,
      'object': true,
    }, {
      'enforceForRenamedProperties': false,
    }],
    'consistent-return': ['error'],
  },
};
