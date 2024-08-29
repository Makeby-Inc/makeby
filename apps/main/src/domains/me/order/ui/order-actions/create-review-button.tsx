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
	Textarea,
	useForm,
	useToast
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@core/react'
import { type MyOrderItem } from '#/me/order/model/my-order-item'
import { OrderActionButton } from '#/me/order/ui/order-actions/order-action-button'
import { OrderItemInfo } from '#/me/order/ui/order-actions/order-item-info'
import {
	type CreateReviewDto,
	createReviewDto
} from '#/me/order/model/create-review-dto'
import { ImageUploadSection } from '~/shared/ui'
import { createReviewAction } from '#/me/order/action/create-review'

interface CreateReviewButtonProps {
	item: MyOrderItem
}

export function CreateReviewButton({
	item
}: CreateReviewButtonProps): JSX.Element {
	const { toast } = useToast()
	const createReview = useAction(createReviewAction, {
		onSuccess: () => {
			toast({
				title: '리뷰가 작성되었습니다.'
			})
		}
	})

	const form = useForm<CreateReviewDto>({
		resolver: zodResolver(createReviewDto),
		defaultValues: {
			orderItemId: item.id,
			productImages: [],
			content: ''
		}
	})

	const onSubmit = form.handleSubmit((data) => {
		createReview.execute(data)
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<OrderActionButton label="리뷰 작성" />
			</DialogTrigger>
			<DialogContent hideClose>
				<DialogHeader>
					<DialogTitle>리뷰 작성하기</DialogTitle>
				</DialogHeader>
				<OrderItemInfo item={item} />
				<Form {...form}>
					<form onSubmit={onSubmit} className="space-y-4">
						<FormField
							control={form.control}
							name="productImages"
							render={({ field }) => (
								<FormFieldItem title="이미지" label={false}>
									<ImageUploadSection {...field} />
								</FormFieldItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormFieldItem title="내용" label={false}>
									<Textarea {...field} />
								</FormFieldItem>
							)}
						/>
						<Button className="w-full" type="submit">
							작성하기
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
