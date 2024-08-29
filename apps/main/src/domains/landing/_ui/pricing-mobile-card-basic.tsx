import { Icon } from '@design-system/icon'

export function PricingMobileCardBasic() {
	const yesIcon = <Icon name="CheckIcon" className="text-foreground h-4 w-4" />
	return (
		<div className="bg-secondary flex flex-col gap-6 rounded-lg border border-none p-6">
			<div className="flex flex-col gap-1">
				<div className="flex gap-2 text-lg font-semibold">
					<div className="text-primary">베이직</div>
					<div>수수료 -10%</div>
				</div>
				<div className="text-secondary-foreground text-xs">
					(수수료는 판매 금액 기준)
				</div>
			</div>
			<div className="flex flex-col gap-2 text-sm font-medium">
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
					<div>상품 홍보</div>
				</div>
				<div className="flex items-center gap-2">
					<div>{yesIcon}</div>
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