import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import betterTailwindCss from 'eslint-plugin-better-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...prettierConfig,
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'es5',
          endOfLine: 'lf',
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'better-tailwindcss': betterTailwindCss,
    },
    settings: { 'better-tailwindcss': { entryPoint: 'src/app/globals.css' } },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        { printWidth: 155, group: 'never', preferSingleLine: true },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
