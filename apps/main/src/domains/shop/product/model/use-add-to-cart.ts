'use client'

import { useToast } from '@design-system/ui'
import { useAction } from '@core/react'
import { useProductSelectedOptions } from '#/shop/product/model/use-product-selected-options'
import { createCartItemsAction } from '#/shop/cart/action'
import { type CreateCartDto } from '#/shop/cart/model'

export function useAddToCart() {
	const { selectedOptions, reset } = useProductSelectedOptions()
	const { toast } = useToast()
	const createCartItems = useAction(createCartItemsAction, {
		onSuccess: () => {
			reset()
		}
	})

	function addToCart() {
		if (createCartItems.isExecuting) return false

		if (selectedOptions.length === 0) {
			toast({
				title: '옵션을 선택해주세요',
				description: '하나 이상의 옵션을 선택해주세요',
				variant: 'destructive'
			})
			return false
		}

		const items: CreateCartDto['items'] = selectedOptions.map(
			({ count, option }) => ({
				optionId: option.id,
				quantity: count
			})
		)

		createCartItems.execute({
			items
		})

		return true
	}

	return {
		addToCart
	}
}
