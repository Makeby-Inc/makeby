'use client'

import {
	Button,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	Separator
} from '@design-system/ui'
import { useParams } from 'next/navigation'
import { type ProductSelectableOption } from '#/shop/product/model'
import { SelectedOptions } from '#/shop/product/ui/_detail-action/selected-options'
import { AddToCartButton } from '#/shop/product/ui/_detail-action/add-to-cart-button'
import { StartCheckoutButton } from '#/shop/product/ui/_detail-action/start-checkout-button'

interface MobileOptionDrawerProps {
	options: ProductSelectableOption[]
}

export function MobileOptionDrawer({
	options
}: MobileOptionDrawerProps): JSX.Element {
	const params = useParams()
	const productId = params.productId as string

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="flex-1" size="lg">
					구매하기
				</Button>
			</DrawerTrigger>
			<DrawerContent className="px-4 pb-4">
				<div className="h-4" />
				<SelectedOptions options={options} />
				<Separator />
				<div className=" grid grid-cols-2 gap-2">
					<AddToCartButton productId={productId} />
					<StartCheckoutButton productId={productId} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
