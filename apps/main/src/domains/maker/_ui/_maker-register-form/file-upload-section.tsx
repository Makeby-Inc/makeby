import { Button, type ControllerRenderProps, toast } from '@design-system/ui'
import { forwardRef } from 'react'
import { FileInformationCard } from '#/maker/_ui/_maker-register-form/file-information-card'
import { type FileData } from '~/shared'

interface FileUploadSectionProps {
	portfolioFileUrls: FileData[]
	referenceFileUrls: FileData[]
}

export const FileUploadSection = forwardRef<
	HTMLDivElement,
	ControllerRenderProps<
		FileUploadSectionProps,
		'portfolioFileUrls' | 'referenceFileUrls'
	> & {
		title: string
	}
>(({ title, value, onChange }, ref) => {
	const addFileUpload = () => {
		const id = self.crypto.randomUUID()
		if (value.length >= 3) {
			toast({
				description: '파일 첨부는 최대 3개까지 등록 가능합니다'
			})
			return
		}
		onChange([...value, { id, fileName: '', fileUrl: '' }])
	}

	const removeFileUpload = (id: string) => {
		onChange(value.filter((file) => file.id !== id))
	}

	return (
		<div className="grid gap-3" ref={ref}>
			{value.map((file, index) => (
				<FileInformationCard
					key={file.id}
					title={title}
					data={file}
					isPrimary={index === 0}
					orderIndex={index}
					onDelete={(id) => {
						removeFileUpload(id)
					}}
					onChange={(v) => {
						onChange(value.map((data) => (data.id === v.id ? v : data)))
					}}
				/>
			))}
			<Button
				type="button"
				size="sm"
				variant="outline"
				className="w-fit"
				onClick={addFileUpload}
			>
				추가하기
			</Button>
		</div>
	)
})
FileUploadSection.displayName = 'FileUploadSection'
