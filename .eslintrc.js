module.exports = {
	root: true,
	extends: ['next/core-web-vitals', 'plugin:import/recommended', 'plugin:import/typescript', 'prettier'],
	plugins: ['import', 'simple-import-sort', 'unused-imports', 'prettier'],
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		},
	},
	rules: {
		'@next/next/no-img-element': 'off',
		'@next/next/no-page-custom-font': 'off',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
		'import/no-named-as-default': 'error',
		'import/prefer-default-export': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
			},
		],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
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
	},
};
