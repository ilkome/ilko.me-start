import antfu from '@antfu/eslint-config'

export default antfu(
  {
    imports: false,
    stylistic: {
      css: true,
      html: true,
    },
    typescript: true,
  },
  {
    files: ['**/*.gen.ts'],
    rules: {
      'eslint-comments/disable-enable-pair': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'import/order': 'off',
      'no-console': 'off',
      'perfectionist/sort-array-includes': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-enums': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-exports': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-imports': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-object-types': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'perfectionist/sort-objects': [
        'error',
        { order: 'asc', type: 'natural' },
      ],
      'tailwindcss/no-custom-classname': 'off',
    },
  },
)
