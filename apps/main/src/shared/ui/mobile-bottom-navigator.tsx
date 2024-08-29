'use client'

import { cn } from '@core/utils'
import { BottomNavigator, BottomNavigatorMenu } from '@design-system/template'
import { usePathname } from 'next/navigation'

export function MobileBottomNavigator() {
	const currentPath = usePathname()
	const shouldVisiblePaths = [
		'/',
		'/shop/products',
		'/fleamarket/products',
		'/search',
		'/me'
	]

	return (
		<BottomNavigator
			className={cn(
				'sticky hidden',
				shouldVisiblePaths.some((path) => path === currentPath) && 'max-pc:block'
			)}
		>
			<section className="flex px-0">
				<BottomNavigatorMenu exact href="/" icon="HomeIcon">
					홈
				</BottomNavigatorMenu>
				<BottomNavigatorMenu exact href="/shop/products" icon="GiftTopIcon">
					상품
				</BottomNavigatorMenu>
				<BottomNavigatorMenu
					exact
					href="/fleamarket/products"
					icon="ShoppingBagIcon"
				>
					중고거래
				</BottomNavigatorMenu>
				<BottomNavigatorMenu exact href="/search" icon="MagnifyingGlassIcon">
					검색
				</BottomNavigatorMenu>
				<BottomNavigatorMenu exact href="/me" icon="UserIcon">
					내정보
				</BottomNavigatorMenu>
			</section>
		</BottomNavigator>
	)
}
