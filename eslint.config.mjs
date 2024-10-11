import globals from 'globals';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['/src/**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  stylistic.configs.customize({
    semi: true,
    indent: 2,
    arrowParens: true,
  }),
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
