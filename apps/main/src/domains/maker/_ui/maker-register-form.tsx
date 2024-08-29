'use client'

import { type MakerType } from '@core/models'
import { Label } from '@design-system/ui'
import { useState } from 'react'
import {
	BusinessRegisterForm,
	IndividualRegisterForm
} from '#/maker/_ui/_maker-register-form'
import { OptionSelect, ProfileImageSection, makerTypeMap } from '~/shared'

export function MakerRegisterForm() {
	const [profileUrl, setProfileUrl] = useState<string>('')
	const [makerType, setMakerType] = useState<MakerType | undefined>(undefined)

	const businessOptions = Object.entries(makerTypeMap).map(([key, value]) => ({
		label: value,
		value: key
	}))

	return (
		<div className="grid gap-10">
			<ProfileImageSection
				value={profileUrl}
				onChange={(v) => {
					setProfileUrl(v as string)
				}}
			/>
			<Label title="사업자 등록 여부" size="sm">
				<OptionSelect
					placeholder="사업자 등록 여부를 선택해주세요"
					options={businessOptions}
					value={makerType as string}
					onChange={(v) => {
						setMakerType(v as MakerType)
					}}
				/>
			</Label>
			{makerType === 'INDIVIDUAL' ? (
				<IndividualRegisterForm
					profileUrl={profileUrl}
					makerBusinessType={makerType}
				/>
			) : (
				<BusinessRegisterForm
					profileUrl={profileUrl}
					makerBusinessType={makerType}
				/>
			)}
		</div>
	)
}
