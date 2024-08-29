/** @type {import('next').NextConfig} */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
	reactStrictMode: process.env.NODE_ENV !== 'production',
	experimental: {
		optimizePackageImports: [
			'@design-system/icon',
			'@design-system/templates',
			'@design-system/ui',
			'@design-system/editor',
			'@core/utils'
		]
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Node.js 내장 모듈에 대한 폴백을 제공하지 않음으로 설정
			config.resolve.fallback = { fs: false }
			config.resolve.alias['@core/models'] = false
			config.resolve.alias['@core/auth/services'] = false
		} else {
			config.plugins = [...config.plugins, new PrismaPlugin()]
		}
		if (isProduction) {
			config.optimization = {
				...config.optimization,
				usedExports: process.env.NODE_ENV === 'production',
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							compress: {
								dead_code: true,
								drop_console: !isServer
							},
							output: {
								comments: false // 주석 제거
							}
						},
						minify: TerserPlugin.swcMinify
					})
				]
			}
		}
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'osnrtdhqilbvxjvcqrfh.supabase.co'
			},
			{
				protocol: 'https',
				hostname: 'osnrtdhqilbvxjvcqrfh.supabase.co'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'http',
				hostname: 'k.kakaocdn.net'
			}
		]
	}
}

module.exports = nextConfig
