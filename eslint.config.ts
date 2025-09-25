import { defineConfig } from 'eslint/config';

import javascript from '@eslint/js';
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';
import stylistic from '@stylistic/eslint-plugin';
import typescript from 'typescript-eslint';

export default defineConfig(
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  javascript.configs.recommended,
  ...typescript.configs.recommendedTypeChecked,
  ...typescript.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    semi: true,
    indent: 2,
    arrowParens: true,
  }),
  prettyImport.configs.warn,
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
      '@typescript-eslint/restrict-template-expressions': ['off'],
    },
  },
);
