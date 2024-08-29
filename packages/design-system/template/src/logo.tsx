import { cn } from '@core/utils'
import Image from 'next/image'
import Link from 'next/link'

/**
 * 로고를 표시합니다. 주로 메인 페이지로 이동하는 링크로 사용됩니다.
 * 로고 이미지는 /public/logo.svg에 있습니다.
 * <br/> @param href 링크할 주소
 */
export function Logo({
	href = '/',
	size = 'sm'
}: {
	href?: string
	size?: 'sm' | 'md' | 'lg'
}) {
	const imageSize = {
		sm: { width: 113.3, height: 20 },
		md: { width: 136, height: 24 },
		lg: { width: 181.3, height: 32 }
	}
	return (
		<Link href={href} className="shrink-0">
			<Image
				src="/logo.svg"
				alt="logo"
				width={imageSize[size].width}
				height={imageSize[size].height}
				className={cn(size === 'sm' && 'pc:w-[113px] pc:h-[20px] h-4 w-[90px]')}
				priority
			/>
		</Link>
	)
}
