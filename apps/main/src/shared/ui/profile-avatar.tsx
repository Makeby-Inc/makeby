import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Avatar, AvatarFallback, AvatarImage } from '@design-system/ui'
import Image from 'next/image'
import squareDefaultImage from '~/shared/assets/images/square-default-image.png'

/**
 * @param imageUrl - 프로필 이미지 URL
 * @param name - 이미지 대체 텍스트 (alt)
 */
export function ProfileAvatar({
	imageUrl,
	name,
	size = 'md',
	isDefaultLogo,
	className
}: {
	imageUrl: string
	name: string
	className?: string
	size?: 'xs' | 'sm' | 'md' | 'lg'
	isDefaultLogo?: boolean
}) {
	return (
		<Avatar
			className={cn(
				'h-[120px] w-[120px] rounded-full',
				size === 'sm' && 'h-[52px] w-[52px]',
				className
			)}
		>
			<AvatarImage src={imageUrl} alt={`${name}-profile`} />
			<AvatarFallback className={cn('bg-secondary')}>
				{isDefaultLogo ? (
					<Image
						src={squareDefaultImage}
						alt="default-image"
						width={80}
						height={80}
						className="aspect-square h-20 w-20 object-cover object-center"
					/>
				) : (
					<Icon
						name="UserIcon"
						className={cn(
							'text-background h-20 w-20',
							size === 'sm' && 'h-[30px] w-[30px]',
							size === 'xs' && 'h-5 w-5'
						)}
						solid
					/>
				)}
			</AvatarFallback>
		</Avatar>
	)
}
