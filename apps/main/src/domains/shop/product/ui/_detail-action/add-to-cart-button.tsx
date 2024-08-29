'use client'

import { Button, useToast } from '@design-system/ui'
import { useAddToCart } from '#/shop/product/model'
import { useCheckAuthOrRedirect } from '~/shared'

interface AddToCartButtonProps {
	productId: string
}

export function AddToCartButton({
	productId
}: AddToCartButtonProps): JSX.Element {
	const { checkAuthOrRedirect } = useCheckAuthOrRedirect({
		nextPath: `/shop/products/${productId}`
	})
	const { addToCart } = useAddToCart()
	const { toast } = useToast()

	function handleClick() {
		const isAuthenticated = checkAuthOrRedirect()
		if (!isAuthenticated) return

		const added = addToCart()
		if (!added) return

		toast({
			title: '장바구니에 담았어요',
			description: '결제 페이지에서 확인할 수 있어요'
		})
	}

	return (
		<Button variant="outline" size="lg" onClick={handleClick} className="w-full">
			장바구니 담기
		</Button>
	)
}
