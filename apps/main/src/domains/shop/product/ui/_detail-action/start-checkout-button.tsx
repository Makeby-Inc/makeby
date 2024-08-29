'use client'
import { Button } from '@design-system/ui'
import { useRouter } from 'next/navigation'
import { useAddToCart } from '#/shop/product/model'
import { useCheckAuthOrRedirect } from '~/shared'

interface StartCheckoutButtonProps {
	productId: string
}

export function StartCheckoutButton({
	productId
}: StartCheckoutButtonProps): JSX.Element {
	const { checkAuthOrRedirect } = useCheckAuthOrRedirect({
		nextPath: `/shop/products/${productId}`
	})
	const { addToCart } = useAddToCart()
	const router = useRouter()

	function handleClick() {
		const isAuthenticated = checkAuthOrRedirect()
		if (!isAuthenticated) return

		const added = addToCart()
		if (!added) return

		router.push('/shop/checkout')
	}

	return (
		<Button className="w-full" size="lg" onClick={handleClick}>
			바로 구매하기
		</Button>
	)
}
