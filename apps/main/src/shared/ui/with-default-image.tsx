import { cn } from '@core/utils'
import Image from 'next/image'
import DefaultImage from '~/shared/assets/images/square-default-image.png'

interface WithDefaultImageProps {
	width?: number
	height?: number
	alt?: string
	src?: string | null
	className?: string
}
export function WithDefaultImage({
	width = 300,
	height = 300,
	alt = 'default image',
	src,
	className
}: WithDefaultImageProps): JSX.Element {
	return (
		<Image
			width={width}
			height={height}
			alt={alt}
			src={src || DefaultImage}
			className={cn(className)}
		/>
	)
}
