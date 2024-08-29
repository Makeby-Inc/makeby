import { MakerCartLayout } from '#/shop/_ui/maker-cart-layout'
import { type MakerCartItems } from '#/shop/cart/model'
import { CartItemCard } from '#/shop/cart/ui/cart-item-card'

interface CartItemListSectionProps {
	makerCartItems: MakerCartItems[]
}

export function CartItemListSection({
	makerCartItems
}: CartItemListSectionProps): JSX.Element {
	return (
		<div className="grid gap-10">
			{makerCartItems.map((maker) => (
				<MakerCartLayout key={maker.slug} {...maker}>
					{maker.items.map((item) => (
						<CartItemCard key={item.option.id} item={item} />
					))}
				</MakerCartLayout>
			))}
		</div>
	)
}
