/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, useToast } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import { useAction } from '@core/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateOrderStore } from '#/shop/order/model'
import { checkStocksInCart, createOrderAction } from '#/shop/order/action'
import { useShippingFee } from '#/shop/order/model/use-shipping-fee'

interface PaymentButtonProps {
	totalProductPrice: number
	orderTitle: string
}

export function PaymentButton({
	totalProductPrice,
	orderTitle
}: PaymentButtonProps): JSX.Element {
	const { session } = useAuth()
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)
	const {
		usedPoints,
		agreeToPaymentPolicy,
		agreeToPrivacyPolicy,
		agreeToThirdPartiesPrivacyPolicy,
		deliveryInfo,
		deliveryMessage,
		reset
	} = useCreateOrderStore()
	const router = useRouter()

	const deliveryCost = useShippingFee(deliveryInfo?.postalCode)

	const checkStockAction = useAction(checkStocksInCart, {
		onError: ({ error }) => {
			handleActionError(error)
		}
	})

	const createOrder = useAction(createOrderAction, {
		onSuccess: ({ data }) => {
			if (data) {
				reset()
				router.replace(`/shop/checkout/completed/${data.id}`)
			}
		},
		onError: ({ error }) => {
			handleActionError(error)
		}
	})

	const hasRequiredInfo = !!(
		agreeToPaymentPolicy &&
		agreeToPrivacyPolicy &&
		agreeToThirdPartiesPrivacyPolicy &&
		deliveryInfo
	)

	const totalPaymentAmount = totalProductPrice + deliveryCost - usedPoints
	const totalPaymentAmountText = `${totalPaymentAmount.toLocaleString()}원`

	const handleClick = async () => {
		if (!hasRequiredInfo) return
		console.log('1. 클릭 시작')

		setLoading(true)
		const Bootpay = (await import('@bootpay/client-js')).default
		console.log('2. 부트페이 로드', Bootpay)

		const orderId = crypto.randomUUID()
		console.log('3. Order Id', orderId)

		try {
			const res = await Bootpay.requestPayment({
				application_id: process.env.NEXT_PUBLIC_BOOTPAY_APPLICATION_ID,
				order_id: orderId,
				order_name: orderTitle,
				price: totalPaymentAmount,
				user: {
					id: session?.user.id,
					username: session?.user.name || '',
					addr: deliveryInfo.address,
					email: session?.user.email || ''
				},
				extra: {
					separately_confirmed: true,
					display_error_result: true
				}
			})

			if (res.event !== 'confirm') {
				throw new Error('결제 실패')
			}

			const hasStock = await checkStockAction.executeAsync()
			console.log('4. 재고 확인', hasStock)
			if (!hasStock?.data) {
				toast({
					title: '주문 실패',
					description: '재고가 부족합니다',
					variant: 'destructive'
				})
				setLoading(false)
				return
			}

			const confirmedData = await Bootpay.confirm()

			console.log('5. Bootpay Res 2 ', confirmedData)
			if (confirmedData.event === 'done') {
				const paymentMethod = confirmedData.data.method as string
				const receiptUrl = confirmedData.data.receipt_url as string
				createOrder.execute({
					orderId,
					orderTitle,
					deliveryInfoId: deliveryInfo.id,
					deliveryMessage,
					usedPoints,
					paymentMethod,
					receiptUrl
				})
			} else {
				throw new Error('결제 실패')
			}
		} catch (e: any) {
			console.error(e)
			setLoading(false)
			if (e.event !== 'cancel') {
				handleActionError(e)
			}
		}
	}

	const handleActionError = (error: any) => {
		console.error(error)
		toast({
			title: '주문에 실패했어요',
			description: '잠시 후 다시 시도해주세요',
			variant: 'destructive'
		})
		setLoading(false)
	}

	// const confirmedOrder = async () => {
	// 	const Bootpay = (await import('@bootpay/client-js')).default

	// }

	return (
		<Button
			className="w-full"
			size="lg"
			disabled={loading || !hasRequiredInfo}
			onClick={handleClick}
		>
			{hasRequiredInfo
				? `${totalPaymentAmountText} 결제하기`
				: '주문 정보를 입력해주세요'}
		</Button>
	)
}
