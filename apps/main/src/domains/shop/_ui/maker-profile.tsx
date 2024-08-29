'use client'

import { Icon } from '@design-system/icon'
import { cn } from '@core/utils'
import { useRouter } from 'next/navigation'
import { WithDefaultImage } from '~/shared'
import {
	MakerSocialLabel,
	type MakerSocialLabelProps
} from '#/shop/_ui/maker-social-label'

interface MakerProfileProps {
	slug: string
	name: string
	businessName: string
	profileUrl?: string | null
	inDetail?: boolean
	socialNetworkIds: MakerSocialLabelProps[]
}

export function MakerProfile({
	slug,
	name,
	businessName,
	profileUrl,
	socialNetworkIds,
	inDetail = false
}: MakerProfileProps) {
	const router = useRouter()
	const handleClick = () => {
		if (!inDetail) {
			router.push(`/shop/detail/${slug}`)
		}
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				'gap-xl max-pc:py-4 group flex w-full items-center justify-between rounded-md border px-6 py-4 text-start ',
				!inDetail && 'transition-shadow hover:shadow',
				inDetail && 'cursor-default'
			)}
		>
			<div className="flex items-center gap-4">
				<WithDefaultImage
					src={profileUrl}
					alt="logo"
					width={80}
					height={80}
					className={cn(
						'h-14 w-14 shrink-0 rounded-full border',
						inDetail && 'pc:w-20 pc:h-20'
					)}
				/>

				<div className="flex flex-col gap-[5px]">
					<div
						className={cn(
							'text-sm font-semibold',
							inDetail && 'pc:text-2xl text-base'
						)}
					>
						{businessName}
					</div>
					<div className="flex flex-wrap">
						{socialNetworkIds.map((socialNetworkId) => (
							<MakerSocialLabel key={socialNetworkId.socialId} {...socialNetworkId} />
						))}
					</div>
				</div>
			</div>
			{!inDetail && (
				<Icon
					name="ChevronRightIcon"
					className="max-pc:w-4 max-pc:h-4 transition-transform group-hover:translate-x-2"
				/>
			)}
		</button>
	)
}
