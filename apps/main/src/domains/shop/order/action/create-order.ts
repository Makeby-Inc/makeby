'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { solapiService } from '@providers/solapi'
import { createOrderDto } from '#/shop/order/model'
import { getCartItemListAction } from '#/shop/cart'
import { DELIVERY_COST, SITE_DOMAIN } from '~/shared'

export const createOrderAction = authAction
	.metadata({
		actionName: 'createOrderAction'
	})
	.schema(createOrderDto)
	.action(async ({ ctx, parsedInput }) => {
		const userId = ctx.userId
		const {
			orderId,
			deliveryInfoId,
			deliveryMessage,
			paymentMethod,
			usedPoints,
			orderTitle,
			receiptUrl
		} = parsedInput
		const cart = await getCartItemListAction()

		if (!cart?.data || cart.data.length === 0) {
			throw new Error('장바구니에 상품이 없습니다.')
		}

		const deliveryInfo = await db.deliveryInformation.findUniqueOrThrow({
			where: {
				id: deliveryInfoId
			}
		})
		const orderNumber = await generateOrderNumber()
		const {
			address,
			addressLabel,
			addressee,
			detailAddress,
			phoneNumber,
			postalCode
		} = deliveryInfo

		const orderItems = cart.data.flatMap(({ items }) =>
			items.map((item) => {
				return {
					productOptionId: item.option.id,
					quantity: item.quantity,
					totalPrice: item.option.price * item.quantity
				}
			})
		)

		const totalPrice = orderItems.reduce((acc, item) => acc + item.totalPrice, 0)
		const totalPaymentAmount = totalPrice + DELIVERY_COST - usedPoints

		const order = await db.productOrder.create({
			data: {
				id: orderId,
				address,
				addressee,
				addressLabel,
				detailAddress,
				phoneNumber,
				postalCode,
				orderNumber,
				totalPaymentAmount,
				totalPrice,
				receiptUrl,
				deliveryFee: DELIVERY_COST,
				paymentStatus: 'COMPLETED',
				deliveryNote: deliveryMessage,
				paymentType: paymentMethod,
				title: orderTitle || '메잇바이 주문',
				usedPoint: usedPoints,
				user: {
					connect: {
						id: userId
					}
				},
				orderItems: {
					createMany: {
						data: orderItems.map((i) => ({
							...i,
							deliveryStatus: 'PENDING'
						}))
					}
				}
			}
		})

		await processAfterOrderCreated({
			userId,
			orderId,
			usedPoints
		})

		return order
	})

async function generateOrderNumber() {
	const today = new Date()
		.toLocaleDateString('ko-KR', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit'
		})
		.replace(/\./g, '')
		.replace(/ /g, '')
	let isExist = false
	let orderNumber = ''

	while (!isExist) {
		orderNumber = `${today}_${Math.floor(Math.random() * 100000).toString()}`

		const order = await db.productOrder.findUnique({
			where: {
				orderNumber
			}
		})

		if (!order) {
			isExist = true
		}
	}

	return orderNumber
}

async function processAfterOrderCreated({
	userId,
	orderId,
	usedPoints
}: {
	userId: string
	orderId: string
	usedPoints?: number
}) {
	await Promise.all([
		deleteCartByUserId(userId),
		decreaseStock({ orderId }),
		decreasePoint({
			userId,
			points: usedPoints || 0,
			orderId
		}),
		sendNotification(orderId)
	])
}

async function sendNotification(orderId: string) {
	const order = await db.productOrder.findUniqueOrThrow({
		where: {
			id: orderId
		},
		include: {
			user: true,
			orderItems: {
				include: {
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
			}
		}
	})

	const makerName = order.orderItems[0]?.option.product.maker.businessName || ''
	const link = `/me/orders/${orderId}`

	await solapiService.sendKakaoAlimtalk({
		templateId: 'KA01TP240619084124842xnqEYkfoWvZ',
		to: order.user.phoneNumber,
		variables: {
			'#{고객명}': order.user.name,
			'#{주문번호}': order.orderNumber,
			'#{메이커명}': makerName,
			'#{상품명}': order.title,
			'#{주문총액}': `${order.totalPaymentAmount.toLocaleString()}원`,
			'#{url}': `${SITE_DOMAIN}${link}`
		}
	})

	await db.notification.create({
		data: {
			notificationType: '결제 완료',
			content: `'${order.title}' 주문이 완료되었습니다.`,
			user: {
				connect: {
					id: order.userId
				}
			}
		}
	})
}

async function deleteCartByUserId(userId: string) {
	await db.shoppingCartItem.deleteMany({
		where: {
			userId
		}
	})
}

async function decreasePoint({
	userId,
	points,
	orderId
}: {
	userId: string
	points: number
	orderId: string
}) {
	if (!points) return

	await db.user.update({
		where: {
			id: userId
		},
		data: {
			totalPoint: {
				decrement: points
			},
			pointRecords: {
				create: {
					isUsed: true,
					pointAmount: points,
					productOrder: {
						connect: {
							id: orderId
						}
					}
				}
			}
		}
	})
}

async function decreaseStock({ orderId }: { orderId: string }) {
	const order = await db.productOrder.findUniqueOrThrow({
		where: {
			id: orderId
		},
		include: {
			orderItems: {
				include: {
					option: true
				}
			}
		}
	})

	await Promise.all(
		order.orderItems.map(async (item) => {
			const { option, quantity } = item

			await db.productOption.update({
				where: {
					id: option.id
				},
				data: {
					stock: {
						decrement: quantity
					}
				}
			})
		})
	)

	return true
}
