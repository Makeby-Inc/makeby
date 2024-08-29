import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { ImageContainer } from '@design-system/ui'
import { Uploader } from './uploader'

interface ImageUploaderProps
	extends Omit<React.ComponentProps<typeof Uploader>, 'children'> {
	label?: string
}
/**
 * 사용자가 이미지를 선택하고 업로드할 수 있도록 하는 컴포넌트입니다.
 * props는 Uploader 컴포넌트와 동일합니다.
 */
function ImageUploader({
	className,
	label = '이미지 추가',
	accept = 'image/*',
	...props
}: ImageUploaderProps) {
	return (
		<Uploader accept={accept} {...props}>
			<div
				className={cn(
					'bg-background border-strong flex aspect-square h-20 w-20 flex-col items-center justify-center gap-2 whitespace-nowrap rounded-md border p-4',
					className
				)}
			>
				<Icon name="CameraIcon" />
				<span className="text-sm">{label}</span>
			</div>
		</Uploader>
	)
}
ImageUploader.displayName = 'ImageUploader'

interface UploadedImageProps {
	src: string
	onRemove: () => void
	className?: string
}
/**
 * uploaded-image 컴포넌트를 통해 업로드한 이미지를 확인하고 삭제할 수 있습니다.
 */
function UploadedImage({ src, className, onRemove }: UploadedImageProps) {
	return (
		<div className={cn('relative aspect-square w-20', className)}>
			<ImageContainer
				src={src}
				alt=""
				width={80}
				height={80}
				className="rounded-md"
			/>
			<button
				type="button"
				className="bg-foreground text-background absolute -right-[6px] -top-[6px] rounded-sm p-1"
				onClick={onRemove}
			>
				<Icon name="XMarkIcon" size="sm" />
			</button>
		</div>
	)
}
UploadedImage.displayName = 'UploadedImage'

export { ImageUploader, UploadedImage }
