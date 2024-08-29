import { db } from '@core/models'
import { solapiService } from '@providers/solapi'
import { confirmOrderItemById } from '#/me/order/action'
import { SITE_DOMAIN } from '~/shared/lib/constants'

export const dynamic = 'force-dynamic'

export async function GET() {
	const tenDaysAgo = new Date()
	tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)

	const autoConfirmedOrders = await db.productOrderItem.findMany({
		where: {
			deliveryStatus: 'SENT',
			updatedAt: {
				lte: tenDaysAgo
			}
		},
		include: {
			order: {
				include: {
					user: true
				}
			},
			option: {
				include: {
					product: {
						include: {
							maker: true
						}
					}
				}
			}
		}
	})

	let count = 0

	for (const orderItem of autoConfirmedOrders) {
		count++

		await solapiService.sendKakaoAlimtalk({
			to: orderItem.order.user.phoneNumber,
			templateId: 'KA01TP240621101550663fnXGZ46e88q',
			variables: {
				'#{고객명}': orderItem.order.user.name,
				'#{주문번호}': orderItem.order.orderNumber,
				'#{메이커명}': orderItem.option.product.maker.businessName,
				'#{상품명}': orderItem.option.product.title,
				'#{url}': `${SITE_DOMAIN}/me/orders/${orderItem.order.id}`
			}
		})

		await confirmOrderItemById(orderItem.id, orderItem.order.userId)
	}

	return Response.json({ count })
}
