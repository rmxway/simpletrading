module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
	},
	extends: [
		'airbnb',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	plugins: [
		'@typescript-eslint',
		'unused-imports',
		'simple-import-sort',
		'prettier',
		'react',
		'react-hooks',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	rules: {
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off',
		'no-shadow': 'off',
		'no-plusplus': 'off',
		'no-new': 'off',
		camelcase: 'off',
		'react/react-in-jsx-scope': 'off',
        // "react/display-name": 'off',
		'no-underscore-dangle': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
		'@typescript-eslint/no-shadow': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'import/no-named-as-default': 'error',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
			},
		],

		'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.ts', '.tsx', '.js'],
			},
		},
	},
	parser: '@typescript-eslint/parser',
};
