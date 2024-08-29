'use client'

import { useDialogStore } from '@core/react'
import { Button, Dialog, DialogContent } from '@design-system/ui'
import Image from 'next/image'
import MakebyCompleteImage from '~/shared/assets/icon/makeby-complete-image.svg'

export function WelcomeDialog() {
	const { isWelcomeDialogOpened, toggleDialog } = useDialogStore()

	return (
		<Dialog open={isWelcomeDialogOpened}>
			<DialogContent hideClose className="pc:w-[440px] max-w-[calc(100%-32px)]">
				<div className="grid items-center whitespace-pre-line text-center">
					<Image
						src={MakebyCompleteImage}
						alt="complete-image"
						width={120}
						height={120}
						className="mx-auto pt-4"
					/>
					<div className="mb-10 mt-4 grid gap-2">
						<div className="text-xl font-semibold">메잇바이에 오신 것을 환영해요</div>
						<div className="text-secondary-foreground">{`지금 바로 제작한 굿즈를 판매도 해보고\n중고 굿즈 거래도 이용해 보세요!`}</div>
					</div>
					<Button
						onClick={() => {
							toggleDialog('isWelcomeDialogOpened')
						}}
					>
						확인했어요
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
