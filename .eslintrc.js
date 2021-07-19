const offInDev = process.env.NODE_ENV === 'production' ? 'warn' : 'off'

module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ['plugin:vue/vue3-recommended', 'eslint:recommended'],
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-vars': 'off',
    'no-undef': offInDev,
    'no-extra-semi': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/valid-template-root': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
