'use client'

import { type SocialNetworkType } from '@core/models'
import { cn } from '@core/utils'
import { Button, Input } from '@design-system/ui'
import { OptionSelect } from '~/shared/ui'
import { type SocialData } from '~/shared/model'
import { snsTypeMap } from '~/shared/lib'

interface SnsInformationCardProps {
	data: SocialData
	isPrimary?: boolean
	className?: string
	onDelete: (id: string) => void
	onChange: (data: SocialData) => void
}

export function SnsInformationCard({
	data,
	isPrimary = false,
	className,
	onDelete,
	onChange
}: SnsInformationCardProps) {
	const snsOptions = Object.entries(snsTypeMap).map(([key, value]) => ({
		label: value,
		value: key
	}))

	return (
		<div
			className={cn(
				'bg-secondary border-strong divide-strong divide-y rounded-lg border',
				className
			)}
		>
			<div
				className={cn(
					'flex items-center justify-between gap-2 px-4 py-[10px]',
					isPrimary && 'py-[18px]'
				)}
			>
				<div className="text-sm font-semibold">
					{isPrimary ? '대표 SNS' : '기타 SNS'}
				</div>
				{!isPrimary && (
					<Button
						type="button"
						size="sm"
						variant="outline"
						className="border-strong"
						onClick={() => {
							onDelete(data.id)
						}}
					>
						삭제
					</Button>
				)}
			</div>

			<div className="flex items-center gap-2 p-4">
				<OptionSelect
					options={snsOptions}
					value={data.socialType}
					onChange={(v) => {
						onChange({ ...data, socialType: v as SocialNetworkType })
					}}
					className="w-[140px] shrink-0"
				/>
				<Input
					value={data.socialId}
					onChange={(e) => {
						onChange({ ...data, socialId: e.target.value })
					}}
					maxLength={30}
					placeholder="@를 제외한 아이디만 입력해주세요"
				/>
			</div>
		</div>
	)
}
