declare module '@configs/next' {
	export const reactStrictMode: boolean
	export const experimental: {
		optimizePackageImports: string[]
	}
	export function webpack(config: any, context: { isServer: boolean }): any
	export const images: {
		remotePatterns: {
			protocol: string
			hostname: string
		}[]
	}
}
