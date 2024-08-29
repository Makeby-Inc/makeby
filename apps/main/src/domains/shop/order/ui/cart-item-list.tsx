import { type MakerCartItems } from '#/shop/cart/model'
import { MakerCartLayout } from '#/shop/_ui/maker-cart-layout'
import { CartItemCard } from '#/shop/cart/ui/cart-item-card'

interface CartItemListProps {
	makerCartItemList: MakerCartItems[]
}

export function CartItemList({
	makerCartItemList
}: CartItemListProps): JSX.Element {
	return (
		<div className="grid gap-2">
			<h2 className="font-semibold">상품 정보</h2>
			<div className="grid gap-4">
				{makerCartItemList.map((maker) => (
					<MakerCartLayout key={maker.slug} {...maker}>
						{maker.items.map((item) => (
							<CartItemCard key={item.option.id} item={item} />
						))}
					</MakerCartLayout>
				))}
			</div>
		</div>
	)
}
