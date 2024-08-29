'use client'

import { Dialog, DialogClose, DialogContent } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useDialogStore } from '@core/react'
import { UpdateDeliveryInfoForm } from '#/me/order/ui/delivery-info/update-delivery-info-form'
import { useUpdateDeliveryInfoStore } from '#/me/order/model'

export function UpdateDeliveryInfoModal(): JSX.Element {
	const { isUpdateDeliveryInfoModalOpened, toggleDialog } = useDialogStore()
	const { data, reset } = useUpdateDeliveryInfoStore()

	return (
		<Dialog
			open={isUpdateDeliveryInfoModalOpened}
			onOpenChange={() => {
				toggleDialog('isUpdateDeliveryInfoModalOpened')
			}}
		>
			<DialogContent hideClose>
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">배송지 수정하기</h1>
					<DialogClose>
						<Icon name="XMarkIcon" />
					</DialogClose>
				</div>
				{data ? (
					<UpdateDeliveryInfoForm
						initData={data}
						onUpdate={() => {
							toggleDialog('isUpdateDeliveryInfoModalOpened')
							reset()
						}}
					/>
				) : null}
			</DialogContent>
		</Dialog>
	)
}
