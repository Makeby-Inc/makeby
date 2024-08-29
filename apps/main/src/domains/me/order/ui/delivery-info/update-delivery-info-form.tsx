'use client'

import {
	Button,
	Checkbox,
	Form,
	FormField,
	FormFieldItem,
	Input,
	useForm
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@core/react'
import { DaumAddressInput } from '~/shared/ui/daum-address-input'
import { addPhoneNumberHyphen } from '~/shared'
import {
	updateDeliveryInfoDto,
	type UpdateDeliveryInfoDto
} from '#/me/order/model/update-delivery-info-dto'
import {
	deleteDeliveryInfoAction,
	updateDeliveryInfoAction
} from '#/me/order/action'

interface UpdateDeliveryInfoFormProps {
	onUpdate: () => void
	initData: UpdateDeliveryInfoDto
}

export function UpdateDeliveryInfoForm({
	onUpdate,
	initData
}: UpdateDeliveryInfoFormProps): JSX.Element {
	const updateAction = useAction(updateDeliveryInfoAction, {
		onSuccess: () => {
			onUpdate()
		}
	})

	const deleteAction = useAction(deleteDeliveryInfoAction, {
		onSuccess: () => {
			onUpdate()
		}
	})
	const form = useForm<UpdateDeliveryInfoDto>({
		resolver: zodResolver(updateDeliveryInfoDto),
		defaultValues: initData
	})

	function onSubmit(data: UpdateDeliveryInfoDto) {
		updateAction.execute(data)
	}

	function handleDeleteClick() {
		const confirmed = confirm('정말 삭제하시겠습니까?')

		if (confirmed) {
			deleteAction.execute({ id: initData.id })
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="pc:gap-8 grid gap-6">
				<FormField
					name="addressLabel"
					render={({ field }) => (
						<FormFieldItem title="배송지 이름">
							<Input {...field} placeholder="우리집" />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="addressee"
					render={({ field }) => (
						<FormFieldItem title="받는 분">
							<Input {...field} placeholder="홍길동" />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="phoneNumber"
					render={({ field }) => (
						<FormFieldItem title="연락처">
							<Input
								{...field}
								onChange={(e) => {
									const { value } = e.target
									const phoneNumber = addPhoneNumberHyphen(value)
									form.setValue('phoneNumber', phoneNumber)
								}}
								placeholder="010-1234-5678"
								maxLength={13}
								type="tel"
							/>
						</FormFieldItem>
					)}
				/>

				{/* 주소 */}
				<div className="grid gap-2">
					<FormField
						name="postalCode"
						render={({ field }) => (
							<FormFieldItem title="주소">
								<DaumAddressInput
									value={field.value}
									onDaumPostcodeChange={(data) => {
										form.setValue('postalCode', data.zonecode)
										form.setValue('address', data.address)
										form.setFocus('detailAddress')
									}}
								/>
							</FormFieldItem>
						)}
					/>

					<FormField
						name="address"
						render={({ field }) => (
							<FormFieldItem>
								<Input placeholder="주소 (자동입력)" {...field} readOnly />
							</FormFieldItem>
						)}
					/>

					<FormField
						name="detailAddress"
						render={({ field }) => (
							<FormFieldItem>
								<Input placeholder="상세주소를 입력해주세요" {...field} />
							</FormFieldItem>
						)}
					/>
				</div>

				<FormField
					name="isPrimary"
					render={({ field }) => (
						<FormFieldItem>
							<div className="flex items-center gap-2">
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										field.onChange(checked)
									}}
								/>
								<span>기본 배송지로 설정</span>
							</div>
						</FormFieldItem>
					)}
				/>

				<div className="flex gap-2">
					<Button type="button" variant="outline" onClick={handleDeleteClick}>
						삭제
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={updateAction.isExecuting}
					>
						저장하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
