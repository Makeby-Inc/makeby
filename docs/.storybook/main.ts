import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
	framework: getAbsolutePath('@storybook/nextjs'),

	stories: [
		'../stories/**/*.tsx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
	],

	staticDirs: ['../public'],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
		'@chromatic-com/storybook'
	],

	docs: {
		defaultName: 'Overview'
	},

	env: (config) => ({
		...config,
		NEXT_PUBLIC_KAKAO_MAP_API_KEY: '381e0716ebb583f0e6111b9754d9131b'
	}),

	webpackFinal: (config) => {
		config.resolve = config.resolve || {}
		config.resolve.alias = config.resolve.alias || {}
		config.resolve.alias['next/navigation'] = require.resolve(
			'../__mocks__/next/navigation'
		)
		return config
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript'
	}
}
export default config

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
