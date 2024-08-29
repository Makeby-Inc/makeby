import { Button } from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'
import MakerBannerDesktopImage from '~/shared/assets/images/maker-banner-desktop-image.png'
import MakerBannerMobileImage from '~/shared/assets/images/maker-banner-mobile-image.png'
import MakerBannerDetailImage from '~/shared/assets/images/maker-banner-detail-image.png'

export function MakerLandingBanner() {
	return (
		<div className="relative flex w-full items-center justify-center">
			<div className="max-pc:hidden absolute inset-0 z-10 flex flex-col items-center justify-center gap-10">
				<Image src={MakerBannerDetailImage} alt="" width={608} />
				<Link href={'/maker/register'}>
					<Button size={'lg'} className="w-[240px]">
						메이커 신청하기
					</Button>
				</Link>
			</div>
			<div className="max-pc:hidden relative z-0 h-[600px] w-full">
				<Image
					src={MakerBannerDesktopImage}
					alt="Desktop Banner"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="pc:hidden relative h-[240px] w-full">
				<Image
					src={MakerBannerMobileImage}
					alt="Mobile Banner"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</div>
	)
}
