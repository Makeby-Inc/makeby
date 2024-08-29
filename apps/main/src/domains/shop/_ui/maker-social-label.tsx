import { type SocialNetworkType } from '@core/models'
import { cn } from '@core/utils'
import Image from 'next/image'
import Link from 'next/link'
import XImage from '~/shared/assets/icon/x-logo.svg'
import InstagramImage from '~/shared/assets/icon/instagram-logo.svg'
import NaverImage from '~/shared/assets/icon/naver-logo.svg'

export interface MakerSocialLabelProps {
	socialId: string
	type: SocialNetworkType
	className?: string
}

interface SocialData {
	SocialImage: string
	baseUrl: string
}

const socialMap: Record<SocialNetworkType, SocialData> = {
	INSTAGRAM: {
		SocialImage: InstagramImage,
		baseUrl: 'https://www.instagram.com/'
	},
	NAVER: {
		SocialImage: NaverImage,
		baseUrl: 'https://blog.naver.com/'
	},
	X: {
		SocialImage: XImage,
		baseUrl: 'https://x.com/'
	}
}

export function MakerSocialLabel({
	socialId,
	type,
	className
}: MakerSocialLabelProps): JSX.Element {
	const { SocialImage } = socialMap[type]

	return (
		<Link
			target="_blank"
			href={`${socialMap[type].baseUrl}${socialId}`}
			className={cn(
				'bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs',
				className
			)}
		>
			<Image
				src={SocialImage}
				alt="logo"
				width={30}
				height={30}
				className="h-3 w-3"
			/>
			<span>{socialId}</span>
		</Link>
	)
}
