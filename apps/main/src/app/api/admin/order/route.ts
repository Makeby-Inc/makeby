import { db } from '@core/models'
import { solapiService } from '@providers/solapi'
import { SITE_DOMAIN } from '~/shared'

export async function POST(req: Request) {
	const { orderItemId, trackingNumber } = await req.json()

	if (
		!orderItemId ||
		typeof orderItemId !== 'string' ||
		!trackingNumber ||
		typeof trackingNumber !== 'string'
	) {
		throw new Error('Invalid makerId')
	}

	const orderItem = await db.productOrderItem.update({
		where: {
			id: orderItemId
		},
		data: {
			deliveryStatus: 'SENT',
			trackingNumber
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

	await solapiService.sendKakaoAlimtalk({
		to: orderItem.order.user.phoneNumber,
		templateId: 'KA01TP240621100952057RuLL3UxeoZN',
		variables: {
			'#{주문번호}': orderItem.order.orderNumber,
			'#{메이커명}': orderItem.option.product.maker.businessName,
			'#{상품명}': `${orderItem.option.product.title} (${orderItem.option.title})`,
			'#{운송장번호}': trackingNumber,
			'#{url}': `${SITE_DOMAIN}/maker`
		}
	})

	return Response.json(orderItem, { status: 200 })
}
