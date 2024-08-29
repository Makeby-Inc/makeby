import { Button, Separator } from '@design-system/ui'
import { MobileBottomStickySection } from '@design-system/template'
import Link from 'next/link'
import { CartItemListSection, CartSummary, GoToCheckoutButton } from '#/shop'
import { getCartItemListAction } from '#/shop/cart/action'
import { MobileDetailHeader } from '~/shared'
import { EmptyContent } from '~/shared/ui/empty-content'

export const metadata = {
	title: '장바구니'
}

export default async function CartPage() {
	const cartItemList = await getCartItemListAction()

	if (!cartItemList?.data || cartItemList.data.length === 0) {
		return (
			<section className="py-10">
				<EmptyContent
					title="장바구니에 담은 상품이 없어요"
					description="상품 페이지에서 장바구니에 담아주세요"
					actionSlot={<GoToProductList />}
				/>
			</section>
		)
	}

	const totalQuantity = cartItemList.data.reduce(
		(acc, maker) => acc + maker.items.reduce((i, item) => i + item.quantity, 0),
		0
	)

	const totalPrice = cartItemList.data.reduce(
		(acc, maker) =>
			acc +
			maker.items.reduce((i, item) => i + item.quantity * item.option.price, 0),
		0
	)

	return (
		<>
			<MobileDetailHeader pageTitle="장바구니" />
			<section className="pc:py-[60px] pc:flex pc:gap-10 py-6">
				<div className="pc:grid pc:gap-10 pc:flex-1">
					<h1 className="max-pc:hidden text-4xl font-semibold">장바구니</h1>
					<CartItemListSection makerCartItems={cartItemList.data} />
				</div>
				<Separator orientation="vertical" className="max-pc:hidden" />
				<div className="pc:w-[380px] pc:sticky pc:h-fit pc:top-[calc(68px+60px)]">
					<CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
					<div className="max-pc:hidden mt-10">
						<GoToCheckoutButton />
					</div>
				</div>
			</section>
			<div className="pc:hidden h-20" />
			<MobileBottomStickySection>
				<GoToCheckoutButton />
			</MobileBottomStickySection>
		</>
	)
}

function GoToProductList() {
	return (
		<Button asChild>
			<Link href="/shop/products">상품 구경하기</Link>
		</Button>
	)
}
