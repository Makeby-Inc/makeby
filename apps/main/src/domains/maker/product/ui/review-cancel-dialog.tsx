'use client'

import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	toast
} from '@design-system/ui'
import { cancelProductReviewAction } from '#/maker/product/action'

interface ReviewCancelDialogProps {
	productId: string
}

export function ReviewCancelDialog({ productId }: ReviewCancelDialogProps) {
	const cancelProductReview = useAction(cancelProductReviewAction, {
		onError: () => {
			toast({
				title: '심사 취소 중 오류가 발생했습니다',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const handleCancelReview = () => {
		cancelProductReview.execute({
			productId
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className="text-secondary-foreground border-strong rounded-lg text-base font-semibold"
				>
					심사 취소
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="pc:w-[400px] max-w-[calc(100%-32px)]">
				<div className="flex flex-col gap-8">
					<div className="grid pt-4 text-center">
						<Icon
							name="ExclamationCircleIcon"
							className="text-primary mx-auto h-[100px] w-[100px]"
							solid
						/>
						<div className="mb-2 mt-4 text-xl font-semibold">
							심사를 취소하시겠어요?
						</div>
						<div className="text-secondary-foreground whitespace-pre-line font-medium">
							{`취소하실 경우, 심사 대기 상태로 변경돼요.\n정말 취소하겠어요?`}
						</div>
					</div>

					<div className="flex gap-2">
						<DialogClose asChild>
							<Button
								size="lg"
								variant="outline"
								className="text-secondary-foreground text-base font-semibold"
							>
								취소
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								size="lg"
								className="flex-1 text-base font-semibold"
								onClick={handleCancelReview}
							>
								심사 취소하기
							</Button>
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
