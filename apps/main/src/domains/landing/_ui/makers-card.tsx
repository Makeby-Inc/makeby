import { cn } from '@core/utils'
import Image from 'next/image'
import Link from 'next/link'
import MakebyDefault from '~/shared/assets/icon/makeby-logo.svg'

interface MakersCardProps {
	slug: string
	makerName: string
	profileUrl: string
}

export function MakersCard({ slug, makerName, profileUrl }: MakersCardProps) {
	return (
		<Link href={`/shop/detail/${slug}`} className="pc:gap-3 flex flex-col gap-2">
			<div
				className={cn(
					'rounded-lg border',
					profileUrl === '' && 'bg-secondary flex items-center justify-center'
				)}
			>
				<Image
					src={profileUrl || MakebyDefault}
					alt="makerLogo"
					width={235}
					height={80}
					className={cn(
						'h-20 w-full object-contain transition-transform hover:scale-110',
						profileUrl === '' && 'w-10'
					)}
				/>
			</div>
			<div className="flex items-center justify-center text-sm font-medium">
				{makerName}
			</div>
		</Link>
	)
}
