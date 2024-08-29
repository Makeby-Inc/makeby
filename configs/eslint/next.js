const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		'@vercel/style-guide/eslint/node',
		'@vercel/style-guide/eslint/browser',
		'@vercel/style-guide/eslint/typescript',
		'@vercel/style-guide/eslint/react',
		'@vercel/style-guide/eslint/next',
		'eslint-config-turbo'
	].map(require.resolve),
	parserOptions: {
		project
	},
	globals: {
		React: true,
		JSX: true
	},
	settings: {
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	ignorePatterns: ['node_modules/', 'dist/'],
	rules: {
		'react/prop-types': 'off',
		'no-implicit-coercion': 'off',
		'import/no-default-export': 'off',
		'react/react-in-jsx-scope': 'off',
		'tailwindcss/classnames-order': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'prettier/prettier': [
			'off',
			{
				endOfLine: 'auto'
			}
		],
		'no-console': 'off',
		'eslint-comments/require-description': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'no-alert': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-confusing-void-expression': 'off'
	}
}
