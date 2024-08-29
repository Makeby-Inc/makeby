'use client'
import { cn } from '@core/utils'
import { Checkbox } from '@design-system/ui'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCreateOrderStore } from '#/shop/order/model'
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '~/shared/lib'

export function CheckAgreementSection(): JSX.Element {
	const {
		agreeToPaymentPolicy,
		agreeToPrivacyPolicy,
		agreeToThirdPartiesPrivacyPolicy,
		toggleAgreeToPaymentPolicy,
		toggleAgreeToPrivacyPolicy,
		toggleAgreeToThirdPartiesPrivacyPolicy,
		toggleAllAgreements
	} = useCreateOrderStore()

	const allChecked =
		agreeToPaymentPolicy &&
		agreeToPrivacyPolicy &&
		agreeToThirdPartiesPrivacyPolicy

	useEffect(() => {
		toggleAgreeToPaymentPolicy(false)
		toggleAgreeToPrivacyPolicy(false)
		toggleAgreeToThirdPartiesPrivacyPolicy(false)
	}, [])

	return (
		<div className="grid gap-2">
			<h5 className="font-semibold">필수 동의사항</h5>
			<div className={cn('bg-secondary overflow-hidden rounded-2xl')}>
				<div className="border-b p-4">
					<CheckItem
						label="아래 내용을 모두 확인하였으며 동의합니다."
						checked={allChecked}
						onCheckedChange={toggleAllAgreements}
					/>
				</div>
				<div className="grid gap-4 p-4 pl-6">
					<CheckItem
						checked={agreeToPaymentPolicy}
						label="결제 대행 서비스 이용약관 동의"
						onCheckedChange={toggleAgreeToPaymentPolicy}
						url={TERMS_OF_SERVICE_URL}
					/>
					<CheckItem
						checked={agreeToPrivacyPolicy}
						label="개인정보 수집 및 이용 동의"
						onCheckedChange={toggleAgreeToPrivacyPolicy}
						url={PRIVACY_POLICY_URL}
					/>
					<CheckItem
						checked={agreeToThirdPartiesPrivacyPolicy}
						label="개인정보 제 3자 정보 제공 동의"
						onCheckedChange={toggleAgreeToThirdPartiesPrivacyPolicy}
						url={PRIVACY_POLICY_URL}
					/>
				</div>
			</div>
		</div>
	)
}

interface CheckItemProps {
	checked: boolean
	label: string
	description?: string
	labelClassName?: string
	url?: string
	onCheckedChange: (checked: boolean) => void
}

function CheckItem({
	checked,
	label,
	description,
	labelClassName,
	url,
	onCheckedChange
}: CheckItemProps): JSX.Element {
	return (
		<label className={cn('flex cursor-pointer items-start gap-2')}>
			<Checkbox
				className="h-5 w-5"
				checked={checked}
				onCheckedChange={onCheckedChange}
			/>
			<div>
				<div className="flex items-center gap-2">
					<h5 className={cn('font-semibold', labelClassName)}>{label}</h5>
					{url ? (
						<Link href={url} target="_black" className="text-primary px-1 text-xs">
							보기
						</Link>
					) : null}
				</div>
				{description ? (
					<p className="text-secondary-foreground whitespace-pre-line break-keep text-sm">
						{description}
					</p>
				) : null}
			</div>
		</label>
	)
}
