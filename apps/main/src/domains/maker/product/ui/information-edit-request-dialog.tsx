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
import { useParams } from 'next/navigation'
import { requestEditProductAction } from '#/maker/product/action'

export function InformationEditRequestDialog() {
	const { id } = useParams()

	const requestEditProduct = useAction(requestEditProductAction, {
		onSuccess: () => {
			toast({
				title: '정보 수정 요청이 완료되었습니다',
				description: '수정하고자 하는 상세 내용은 채널톡으로 문의해주세요',
				variant: 'success'
			})
		},
		onError: () => {
			toast({
				title: '정보 수정 요청 중 오류가 발생했습니다',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const handleRequest = () => {
		requestEditProduct.execute({
			productId: id as string
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="lg" className="flex-1 rounded-lg text-base">
					정보 수정 요청
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
							정보 수정 요청을 하시겠어요?
						</div>
						<div className="text-secondary-foreground whitespace-pre-line font-medium">{`지금 정보 수정 요청을 하면 심사가 해제되고\n심사 대기 상태로 변경돼요`}</div>
					</div>

					<DialogClose asChild>
						<Button
							size="lg"
							className="text-base font-semibold"
							onClick={handleRequest}
						>
							정보 수정 요청하기
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
