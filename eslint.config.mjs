import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

// eslint-config-next 16 exports native flat configs. Do not wrap these in
// FlatCompat — doing so throws "Converting circular structure to JSON".
const eslintConfig = [
  { ignores: ['src/migrations/**', 'src/app/(payload)/admin/importMap.js', '.next/**', 'site/**', 'public/**', 'media/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Plain <img> on purpose: the Webflow stylesheet sizes images itself and uploads are served from Blob's CDN.
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: ['.next/', 'src/payload-types.ts', 'src/payload-generated-schema.ts'],
  },
]

export default eslintConfig
