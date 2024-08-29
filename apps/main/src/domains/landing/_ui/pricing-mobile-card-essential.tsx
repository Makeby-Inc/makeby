import { Icon } from '@design-system/icon'

export function PricingMobileCardEssential() {
	const yesIcon = <Icon name="CheckIcon" className="text-primary h-4 w-4" />
	const noIcon = <Icon name="XMarkIcon" className="text-destructive h-4 w-4" />
	return (
		<div className="bg-secondary flex flex-col gap-6 rounded-lg border border-none p-6">
			<div className="flex flex-col gap-1">
				<div className="flex flex-row justify-between">
					<div className="flex gap-2 text-lg font-semibold">
						<div className="text-primary">에센셜</div>
						<div>수수료 -20%</div>
					</div>
					<div className="text-primary-foreground rounded-full border border-none bg-gradient-to-r from-violet-500 to-lime-400 px-4 py-1 text-sm font-semibold">
						추천
					</div>
				</div>
				<div className="text-secondary-foreground text-xs">
					(수수료는 판매 금액 기준)
				</div>
			</div>
			<div className="flex flex-col gap-2 text-sm font-medium">
				<div className="flex items-start gap-2">
					<div>{yesIcon}</div>
					<div>
						<div>선제적 보증금</div>
						<div>메잇바이 50% 지원</div>
					</div>
				</div>
				<div className="flex items-start gap-2">
					<div>{yesIcon}</div>
					<div>
						<div>홍보 크레딧</div>
						<div>최대 30만원 지원</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{noIcon}</div>
					<div>샘플 제작 비용 지원</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>제작처 비교 자료</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>판매 대행</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>제작 대행</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>불량 검수</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>포장 대행</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>배송 대행</div>
				</div>
				<div className="flex items-start gap-2">
					<div>{yesIcon}</div>
					<div>
						<div>하자 교환</div>
						<div>메잇바이 책임</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>CS 대행</div>
				</div>
			</div>
		</div>
	)
}
