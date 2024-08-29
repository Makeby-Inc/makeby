import Image from 'next/image'
import HelixImage from '~/shared/assets/images/helix-image.png'
import PyramidImage from '~/shared/assets/images/pyramid-image.png'
import FlatCylinderImage from '~/shared/assets/images/flat-cylinder-image.png'
import SpheresImage from '~/shared/assets/images/spheres-image.png'
import CylinderImage from '~/shared/assets/images/cylinder-image.png'
import PillImage from '~/shared/assets/images/pill-image.png'
import CubeImage from '~/shared/assets/images/cube-image.png'
import IcosahedronImage from '~/shared/assets/images/icosahedron-image.png'
import ConeImage from '~/shared/assets/images/cone-image.png'
import ThorusKnotImage from '~/shared/assets/images/thorus-knot-image.png'

export function MakerBenefitContents() {
	const benefitItems = [
		{ title: '선제작 방식', image: ThorusKnotImage },
		{ title: '배송 대행', image: HelixImage },
		{ title: '판매 대행', image: PyramidImage },
		{ title: 'A/S 대행', image: FlatCylinderImage },
		{ title: '제작 대행', image: SpheresImage },
		{ title: 'C/S 대행', image: CylinderImage },
		{ title: '포장 대행', image: PillImage },
		{ title: '신속한 결제 및 발송', image: CubeImage },
		{ title: '검수 대행', image: IcosahedronImage },
		{ title: '교환 및 환불 가능', image: ConeImage }
	]

	return (
		<div className="pc:grid pc:grid-cols-5 pc:text-base pc:font-bold pc:gap-4 no-scrollbar flex gap-4 overflow-x-auto text-sm font-semibold">
			{benefitItems.map((item) => (
				<div
					key={item.title}
					className="bg-secondary flex min-w-[160px] flex-col items-center justify-center gap-6 rounded-lg border border-none px-4 py-6 text-center"
				>
					<Image src={item.image} alt="" className="h-[60px] w-[60px]" />
					{item.title}
				</div>
			))}
		</div>
	)
}
