import globals from 'globals';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['/src/**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  stylistic.configs.customize({
    semi        : true,
    indent      : 2,
    arrowParens : true,
  }),
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService  : true,
        tsconfigRootDir : import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@stylistic/operator-linebreak': ['warn', 'after', {
        overrides: {
          '?'  : 'none',
          ':'  : 'before',
          '||' : 'before',
          '&&' : 'before',
        },
      }],
      '@stylistic/newline-per-chained-call' : ['warn', { ignoreChainWithDepth: 1 }],
      '@stylistic/key-spacing'              : ['warn', {
        align: {
          beforeColon : true,
          afterColon  : true,
          on          : 'colon',
          mode        : 'strict',
        },
      }],
      '@typescript-eslint/no-unused-vars': ['warn'],

    },
  },
);
