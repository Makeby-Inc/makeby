import { redirect } from 'next/navigation'
import { MobileBottomStickySection } from '@design-system/template'
import {
	getDeliveryInfoList,
	getPrimaryDeliveryInfoAction
} from '#/me/order/action'
import { getCartItemListAction } from '#/shop/cart/action'
import { getMyTotalPoint } from '#/shop/order/action'
import {
	CartItemList,
	CheckAgreementSection,
	OrderSummary,
	PaymentButton,
	PointsInput,
	SelectDeliveryMessage
} from '#/shop/order/ui'
import {
	DeliveryInfoEmpty,
	DeliveryInfoListModal
} from '#/me/order/ui/delivery-info'
import { SelectedDeliveryInfo } from '#/shop/order/ui/selected-delivery-info'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '주문하기'
}

export default async function CheckoutPage() {
	const [cartData, selectedDeliveryInfoData, deliveryInfosData, pointData] =
		await Promise.all([
			getCartItemListAction(),
			getPrimaryDeliveryInfoAction(),
			getDeliveryInfoList(),
			getMyTotalPoint()
		])

	const cartItemList = cartData?.data
	const deliveryInfo = selectedDeliveryInfoData?.data
	const deliveryInfos = deliveryInfosData?.data?.deliveryInfoList ?? []
	const totalPoint = pointData?.data?.totalPoint ?? 0

	if (!cartItemList || cartItemList.length === 0) {
		redirect('/shop/cart')
	}

	const totalQuantity = cartItemList.reduce(
		(acc, maker) => acc + maker.items.reduce((i, item) => i + item.quantity, 0),
		0
	)
	const totalPrice = cartItemList.reduce(
		(acc, maker) =>
			acc +
			maker.items.reduce((i, item) => i + item.quantity * item.option.price, 0),
		0
	)

	const representativeItem = cartItemList[0]?.items[0]?.option.title

	const orderTitle =
		totalQuantity > 1
			? `${representativeItem} 외 ${totalQuantity - 1}`
			: representativeItem ?? '메잇바이 주문'

	return (
		<>
			<MobileDetailHeader pageTitle="주문서 작성" fallbackUrl="/shop/cart" />
			<section className="pc:py-[60px] pc:flex pc:gap-20 py-6">
				<div className="grid flex-1 gap-10">
					<CartItemList makerCartItemList={cartItemList} />

					<div className="grid gap-4">
						{deliveryInfo ? (
							<SelectedDeliveryInfo primaryDeliveryInfo={deliveryInfo} />
						) : (
							<DeliveryInfoEmpty />
						)}
						<SelectDeliveryMessage />

						<DeliveryInfoListModal inCheckout deliveryInfos={deliveryInfos} />
					</div>

					<PointsInput totalPrice={totalPrice} totalPoints={totalPoint} />

					{/* MOBILE ONLY */}
					<div className="pc:hidden">
						<OrderSummary
							totalProductPrice={totalPrice}
							totalQuantity={totalQuantity}
						/>
					</div>

					<CheckAgreementSection />
				</div>

				{/* DESKTOP ONLY */}
				<div className="pc:w-[380px] pc:sticky pc:h-fit pc:top-[calc(68px+60px)] max-pc:hidden grid gap-10">
					<OrderSummary
						totalProductPrice={totalPrice}
						totalQuantity={totalQuantity}
					/>
					<PaymentButton totalProductPrice={totalPrice} orderTitle={orderTitle} />
				</div>
			</section>
			<MobileBottomStickySection>
				<PaymentButton totalProductPrice={totalPrice} orderTitle={orderTitle} />
			</MobileBottomStickySection>
		</>
	)
}
