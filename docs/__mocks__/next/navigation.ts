// Mock implementation next/navigation

const usePathname = () => {
	return '/mock-path'
}

const useRouter = () => {
	return {
		back: () => {},
		forward: () => {},
		refresh: () => {},
		push: (href: string, options?: { scroll?: boolean }) => {},
		replace: (href: string, options?: { scroll?: boolean }) => {},
		prefetch: (href: string, options?: { kind: string }) => {}
	}
}

module.exports = {
	usePathname,
	useRouter
}
