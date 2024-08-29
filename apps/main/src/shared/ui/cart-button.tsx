'use client'

import { useAction } from '@core/react'
import { useAuth } from '@providers/auth'
import { useEffect, useState } from 'react'
import { Button } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { cn } from '@core/utils'
import { getCartItemListAction } from '#/shop/cart/action/get-cart-item-list'
import { RedDot } from './red-dot'

export function CartButton({ className = '' }): JSX.Element {
	const { isAuthenticated } = useAuth()
	const [hasItems, setHasItems] = useState(false)
	const [alertCount, setAlertCount] = useState(0)
	const getCartAction = useAction(getCartItemListAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setHasItems(data.length > 0)
				const totalItemCount = data.reduce(
					(acc, shop) => acc + shop.items.length,
					0
				)
				setAlertCount(totalItemCount)
			}
		}
	})

	useEffect(() => {
		if (!isAuthenticated) return
		getCartAction.execute()

		const interval = setInterval(() => {
			getCartAction.execute()
		}, 5 * 1000)

		return () => {
			clearInterval(interval)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	return (
		<Button
			className={cn(
				'h-fit w-fit overflow-visible rounded-none before:hover:opacity-0',
				className
			)}
			variant="ghost"
			options="icon"
			asChild
		>
			<Link href="/shop/cart" className="relative">
				<Icon name="ShoppingBagIcon" />
				{hasItems ? <RedDot count={alertCount} /> : null}
			</Link>
		</Button>
	)
}
