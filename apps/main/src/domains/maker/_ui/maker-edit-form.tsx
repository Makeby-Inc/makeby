'use client'

import { Label } from '@design-system/ui'
import { useState } from 'react'
import { type MakerDetail } from '#/maker/_model'
import { ProfileImageSection, makerTypeMap } from '~/shared'
import { IndividualMakerEditForm } from '#/maker/_ui/individual-maker-edit-form'
import { BusinessMakerEditForm } from '#/maker/_ui/business-maker-edit-form'

export function MakerEditForm({
	data
}: {
	data: MakerDetail | null | undefined
}) {
	const [profileUrl, setProfileUrl] = useState<string>(data?.profileUrl || '')
	if (!data) return null

	const { makerType } = data

	return (
		<div className="grid gap-10">
			<ProfileImageSection
				value={profileUrl}
				onChange={(v) => {
					setProfileUrl(v as string)
				}}
			/>
			<Label title="사업자 등록 여부" size="sm">
				{makerTypeMap[makerType]}
			</Label>
			{makerType === 'INDIVIDUAL' ? (
				<IndividualMakerEditForm profileUrl={profileUrl} maker={data} />
			) : (
				<BusinessMakerEditForm profileUrl={profileUrl} maker={data} />
			)}
		</div>
	)
}
