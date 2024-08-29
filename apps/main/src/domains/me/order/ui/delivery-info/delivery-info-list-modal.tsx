'use client'

import { Button, Dialog, DialogClose, DialogContent } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useDialogStore } from '@core/react'
import { type DeliveryInformation } from '@core/models'
import { CreateDeliveryInfoModal } from '#/me/order/ui/delivery-info/create-delivery-info-modal'
import { useCreateOrderStore } from '#/shop/order/model'
import { DeliveryInfoListItem } from '#/me/order/ui/delivery-info/delivery-info-list-item'
import { UpdateDeliveryInfoModal } from '#/me/order/ui/delivery-info/update-delivery-info-modal'

interface DeliveryInfoListModalProps {
	deliveryInfos: DeliveryInformation[]
	inCheckout?: boolean
}

export function DeliveryInfoListModal({
	deliveryInfos,
	inCheckout
}: DeliveryInfoListModalProps): JSX.Element {
	const { toggleDialog, isDeliveryInfoListModalOpened } = useDialogStore()
	const { deliveryInfo } = useCreateOrderStore()

	return (
		<Dialog
			onOpenChange={() => {
				toggleDialog('isDeliveryInfoListModalOpened')
			}}
			open={isDeliveryInfoListModalOpened}
		>
			{/* <DialogTrigger asChild>
				<Button variant="outline" size="sm">
					배송지 관리
				</Button>
			</DialogTrigger> */}
			<DialogContent hideClose>
				<div className="pc:gap-10 grid gap-6">
					<div className="flex items-center">
						<h2 className="flex-1 text-xl font-semibold">배송지 관리</h2>
						<DialogClose>
							<Icon name="XMarkIcon" />
						</DialogClose>
					</div>

					<div className="grid max-h-[400px] gap-4 overflow-y-auto">
						{deliveryInfos.map((i) => {
							const isSelected = deliveryInfo?.id === i.id

							return (
								<DeliveryInfoListItem
									deliveryInfo={i}
									key={i.id}
									isSelected={isSelected}
									inCheckout={inCheckout}
								/>
							)
						})}
					</div>

					<CreateDeliveryInfoModal
						trigger={
							<Button className="flex w-full items-center gap-2" variant="outline">
								<Icon name="PlusIcon" />
								<span>새 배송지 추가하기</span>
							</Button>
						}
					/>

					<UpdateDeliveryInfoModal />
				</div>
			</DialogContent>
		</Dialog>
	)
}
