'use client'

import { cn } from '@core/utils'
import { Uploader } from '@design-system/template'
import { Button, Input } from '@design-system/ui'
import { type FileData } from '~/shared'

interface FileInformationCardProps {
	title: string
	data: FileData
	isPrimary?: boolean
	orderIndex: number
	className?: string
	onDelete: (id: string) => void
	onChange: (data: FileData) => void
}

export function FileInformationCard({
	title,
	data,
	isPrimary = false,
	orderIndex,
	className,
	onDelete,
	onChange
}: FileInformationCardProps) {
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
					{title}
					{!isPrimary && orderIndex + 1}
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
				<Input
					value={data.fileName}
					placeholder="파일을 업로드해주세요"
					className="disabled:bg-background disabled:text-foreground disabled:border-strong disabled:border"
					disabled
				/>
				<Uploader
					bucket="images"
					accept="image/*, application/pdf"
					onFileChange={(v) => {
						onChange({
							...data,
							fileName: v.name,
							fileUrl: v.url
						})
					}}
				>
					<Button
						type="button"
						variant="outline"
						className="text-secondary-foreground border-strong whitespace-nowrap"
					>
						업로드
					</Button>
				</Uploader>
			</div>
		</div>
	)
}
