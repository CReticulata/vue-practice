import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'camelcase': 'error',
    'no-else-return': 'error',
    'func-style': ['error', 'declaration'],
    'no-constant-condition': 'error',
  },
})
