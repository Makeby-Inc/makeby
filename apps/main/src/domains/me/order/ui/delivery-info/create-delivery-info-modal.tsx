'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useState } from 'react'
import { CreateDeliveryInfoForm } from '#/me/order/ui/delivery-info/create-delivery-info-form'

interface CreateDeliveryInfoModalProps {
	trigger?: JSX.Element
}

export function CreateDeliveryInfoModal({
	trigger
}: CreateDeliveryInfoModalProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)
			}}
		>
			<DialogTrigger asChild>
				{trigger ?? (
					<Button size="sm" variant="outline">
						추가하기
					</Button>
				)}
			</DialogTrigger>
			<DialogContent hideClose>
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">새 배송지 추가하기</h1>
					<DialogClose>
						<Icon name="XMarkIcon" />
					</DialogClose>
				</div>
				<CreateDeliveryInfoForm
					onCreate={() => {
						setIsOpen(false)
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
