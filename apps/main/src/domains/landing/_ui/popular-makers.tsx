import { type PopularMaker } from '#/landing/_model'
import { MakersCard } from '#/landing/_ui/makers-card'

export function PopularMakers({ makersData }: { makersData: PopularMaker[] }) {
	return (
		<div className="flex flex-col gap-6">
			<div className="pc:text-xl text-base font-semibold">
				지금 가장 인기있는 메이커 🔥
			</div>
			<div className="pc:grid-cols-5 pc:gap-4 grid grid-cols-3 gap-2">
				{makersData.map((maker) => (
					<MakersCard
						key={maker.id}
						slug={maker.maker.slug}
						makerName={maker.maker.businessName}
						profileUrl={maker.maker.profileUrl || ''}
					/>
				))}
			</div>
		</div>
	)
}
