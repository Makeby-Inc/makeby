import Image from 'next/image'
import BoltImage from '~/shared/assets/images/bolt-image.png'
import GiftImage from '~/shared/assets/images/gift-image.png'
import CheckImage from '~/shared/assets/images/check-image.png'
import VideoCameraImage from '~/shared/assets/images/video-camera-image.png'

export function UserBenefitContents() {
	const benefitItems = [
		{ title: '결제 당일 발송', image: BoltImage },
		{ title: '선제작 방식', image: GiftImage },
		{ title: '단순 변심으로 인한 교환 환불 가능', image: CheckImage },
		{ title: '필요 없는 개봉 영상', image: VideoCameraImage }
	]

	return (
		<div className="pc:grid pc:grid-cols-4 pc:text-base pc:font-bold pc:gap-4 no-scrollbar flex gap-4 overflow-x-auto text-sm font-semibold">
			{benefitItems.map((item) => (
				<div
					key={item.title}
					className="bg-secondary pc:h-[200px] flex min-w-[160px] flex-col items-center justify-center gap-6 rounded-lg border border-none px-4 py-6 text-center"
				>
					<Image src={item.image} alt="" className="h-[100px] w-[100px]" />
					{item.title === '단순 변심으로 인한 교환 환불 가능' ? (
						<>
							단순 변심으로 인한
							<br />
							교환 환불 가능
						</>
					) : (
						item.title
					)}
				</div>
			))}
		</div>
	)
}
