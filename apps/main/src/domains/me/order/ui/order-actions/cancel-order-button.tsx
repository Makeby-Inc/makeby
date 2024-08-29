'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormField,
	FormFieldItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
	useForm,
	useToast
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { type OrderCancelReasonType } from '@core/models'
import { useAction } from '@core/react'
import { useState } from 'react'
import { OrderActionButton } from '#/me/order/ui/order-actions/order-action-button'
import { type MyOrderItem } from '#/me/order/model/my-order-item'
import {
	type CancelOrderItemDto,
	cancelOrderItemDto
} from '#/me/order/model/cancel-order-item-dto'
import { OrderItemInfo } from '#/me/order/ui/order-actions/order-item-info'
import { cancelOrderItemAction } from '#/me/order/action/cancel-order-item'

interface CancelOrderButtonProps {
	item: MyOrderItem
}

export function CancelOrderButton({
	item
}: CancelOrderButtonProps): JSX.Element {
	const { toast } = useToast()
	const cancelAction = useAction(cancelOrderItemAction, {
		onSuccess: () => {
			toast({
				title: '주문 취소 요청이 완료되었습니다.',
				description: '관리자 확인 후 처리될 예정입니다.'
			})
			setOpen(false)
		}
	})
	const [open, setOpen] = useState(false)

	const form = useForm<CancelOrderItemDto>({
		resolver: zodResolver(cancelOrderItemDto),
		defaultValues: {
			orderItemId: item.id
		}
	})

	const onSubmit = form.handleSubmit((data) => {
		cancelAction.execute(data)
	})

	const cancelTypes: {
		value: OrderCancelReasonType
		label: string
	}[] = [
		{
			value: 'CHANGE_OF_MIND',
			label: '단순 변심'
		},
		{
			value: 'ORDER_MISTAKE',
			label: '주문 실수'
		},
		{
			value: 'CANCEL_AND_REORDER',
			label: '취소 후 재주문'
		},
		{
			value: 'SERVICE_COMPLAINT',
			label: '서비스 불만족'
		}
	]

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<OrderActionButton label="취소하기" />
			</DialogTrigger>
			<DialogContent hideClose>
				<DialogHeader>
					<DialogTitle>주문 취소하기</DialogTitle>
				</DialogHeader>
				<OrderItemInfo item={item} />
				<Form {...form}>
					<form onSubmit={onSubmit} className="space-y-4">
						<FormField
							name="cancelReasonType"
							render={({ field }) => (
								<FormFieldItem title="취소 사유">
									<Select onValueChange={field.onChange} {...field}>
										<SelectTrigger>
											<SelectValue placeholder="취소 사유를 선택해주세요" />
										</SelectTrigger>
										<SelectContent>
											{cancelTypes.map(({ value, label }) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormFieldItem>
							)}
						/>

						<FormField
							name="reason"
							render={({ field }) => (
								<FormFieldItem title="상세 사유 (선택)">
									<Textarea {...field} placeholder="상세 사유를 입력해주세요" />
								</FormFieldItem>
							)}
						/>

						<Button className="w-full" type="submit">
							취소 요청하기
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
