import { Button, type ControllerRenderProps, Input } from '@design-system/ui'
import { forwardRef } from 'react'
import { Uploader } from '@design-system/template'
import { type FileData } from '~/shared'

interface BusinessLicenseUploadSectionProps {
	businessLicenseFileUrl: FileData
}

export const BusinessLicenseUploadSection = forwardRef<
	HTMLDivElement,
	ControllerRenderProps<
		BusinessLicenseUploadSectionProps,
		'businessLicenseFileUrl'
	>
>(({ value, onChange }, ref) => {
	return (
		<div className="flex items-center gap-2" ref={ref}>
			<Input
				value={value.fileName}
				placeholder="사업자등록증을 업로드해주세요"
				className="disabled:bg-background disabled:text-foreground disabled:border-strong disabled:border"
				disabled
			/>
			<Uploader
				bucket="files"
				accept="image/*, application/pdf"
				onFileChange={(v) => {
					onChange({ ...value, fileName: v.name, fileUrl: v.url })
				}}
			>
				<Button
					type="button"
					variant="outline"
					className="border-strong text-secondary-foreground whitespace-nowrap"
				>
					업로드
				</Button>
			</Uploader>
		</div>
	)
})
BusinessLicenseUploadSection.displayName = 'BusinessLicenseUploadSection'
