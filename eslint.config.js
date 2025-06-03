import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser' // ← нужно импортировать
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parser: vueParser, // ← теперь это объект, как нужно
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: '@babel/eslint-parser', // оставляем как строку, т.к. он внутри vueParser
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
      },
    },
    plugins: {
      js,
      vue: pluginVue,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
      ...js.configs.recommended.rules,
      ...pluginVue.configs['flat/recommended'].rules,
    },
  },
])
