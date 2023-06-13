exports.default = {
	plugins: ['jest', 'tailwindcss', 'react-refresh', 'jsx-a11y'],
	env: { browser: true, es2020: true },
	extends: ['eslint:recommended', 'plugin:react-hooks/recommended', 'airbnb-typescript-prettier', 'plugin:tailwindcss/recommended', 'plugin:jsx-a11y/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	rules: {
		'react-refresh/only-export-components': 'warn',
	},
};
