import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['/src/**/*.{js,mjs,cjs,ts}'],
  },
  eslint.configs.recommended,
  stylistic.configs.customize({
    semi: true,
    indent: 2,
    arrowParens: true,
  }),
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@stylistic/operator-linebreak': [
        'warn', 'after',
        {
          overrides: {
            '?': 'none',
            ':': 'before',
            '||': 'before',
            '&&': 'before',
          },
        },
      ],
      '@stylistic/newline-per-chained-call': [
        'warn',
        { ignoreChainWithDepth: 1 },
      ],
      '@stylistic/key-spacing': ['warn'],
      '@stylistic/eol-last': ['warn'],
      '@stylistic/indent': ['warn'],
      '@stylistic/no-trailing-spaces': ['warn'],
      '@stylistic/no-multiple-empty-lines': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],

      '@typescript-eslint/restrict-template-expressions': ['off'],
    },
  },
);
