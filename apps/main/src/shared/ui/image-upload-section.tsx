import { ImageUploader, UploadedImage } from '@design-system/template'
import {
	ScrollArea,
	ScrollBar,
	type ControllerRenderProps
} from '@design-system/ui'
import { forwardRef } from 'react'

interface ImageUploadSectionProps {
	productImages: string[]
}

export const ImageUploadSection = forwardRef<
	HTMLDivElement,
	Pick<
		ControllerRenderProps<ImageUploadSectionProps, 'productImages'>,
		'value' | 'onChange'
	> & {
		isMainImageLabelVisible?: boolean
	}
>(({ isMainImageLabelVisible, value, onChange }, ref) => {
	return (
		<ScrollArea className="pc:max-w-[608px] w-full max-w-[468px]">
			<div ref={ref} className="max-pc:w-max flex items-center gap-2 py-2">
				{value.length < 10 && (
					<ImageUploader
						bucket="images"
						label={`${value.length}/10`}
						onFileChange={(v) => {
							if (value.length >= 10) return
							onChange([...value, v.url])
						}}
						aria-disabled={value.length >= 10}
					/>
				)}
				{value.map((image, index) => (
					<div key={image} className="relative">
						<UploadedImage
							src={image}
							onRemove={() => {
								onChange(value.filter((v) => v !== image))
							}}
						/>
						{isMainImageLabelVisible && index === 0 ? <MainImageLabel /> : null}
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
})
ImageUploadSection.displayName = 'ImageUploadSection'

function MainImageLabel() {
	return (
		<div className="bg-foreground/60 text-background absolute bottom-0 left-0 w-full rounded-b-md py-2 text-center text-xs font-medium">
			대표 이미지
		</div>
	)
}
