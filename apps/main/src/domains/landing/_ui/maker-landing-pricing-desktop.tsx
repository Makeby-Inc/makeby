import { Icon } from '@design-system/icon'
import { Separator } from '@design-system/ui'

export function MakerLandingPricingDesktop() {
	const yesIcon = (
		<div className="flex justify-center">
			<Icon name="CheckIcon" className="text-primary h-4 w-4" />
		</div>
	)
	const noIcon = (
		<div className="flex justify-center">
			<Icon name="XMarkIcon" className="text-destructive h-4 w-4" />
		</div>
	)

	return (
		<div className="max-pc:hidden">
			<div className="flex flex-col gap-[60px] text-center">
				<div className="flex justify-center text-4xl font-bold">요금제 안내</div>
				<div className="bg-secondary flex flex-col gap-10 rounded-xl border border-none p-[60px]">
					<div className="grid grid-cols-4">
						<div />
						<div className="flex flex-col gap-3">
							<div className="text-primary text-lg font-semibold">베이직</div>
							<div className="flex flex-col gap-2">
								<div className="text-3xl font-bold">수수료 10%</div>
								<div className="text-secondary-foreground text-xs">
									(수수료는 판매 금액 기준)
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex items-center justify-center gap-2">
								<div className="text-primary text-lg font-semibold">에센셜</div>
								<div className="text-primary-foreground rounded-full border border-none bg-gradient-to-r from-violet-500 to-lime-400 px-4 py-1 text-sm font-semibold">
									추천
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="text-3xl font-bold">수수료 20%</div>
								<div className="text-secondary-foreground text-xs">
									(수수료는 판매 금액 기준)
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="text-primary text-lg font-semibold">프리미엄</div>
							<div className="flex flex-col gap-2">
								<div className="text-3xl font-bold">수수료 30%</div>
								<div className="text-secondary-foreground text-xs">
									(수수료는 판매 금액 기준)
								</div>
							</div>
						</div>
					</div>
					<Separator className="border-strong border" />
					<div className="grid grid-cols-4 flex-col gap-5 text-center text-sm font-semibold">
						<div className="text-start font-medium">선제작 보증금</div>
						<div>{noIcon}</div>
						<div>메잇바이 50% 지원</div>
						<div>메잇바이 100% 지원</div>
						<div className="text-start font-medium">상품 홍보</div>
						<div>{noIcon}</div>
						<div>홍보 크레딧 최대 30만원 지원</div>
						<div>홍보 크레딧 최대 50만원 지원</div>
						<div className="text-start font-medium">샘플 제작 비용 지원</div>
						<div>{noIcon}</div>
						<div>{noIcon}</div>
						<div>최대 30만원 지원</div>
						<div className="text-start font-medium">제작처 비교 자료</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">판매 대행</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">제작 대행</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">불량 검수</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">포장 대행</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">배송 대행</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div className="text-start font-medium">하자 교환</div>
						<div>메잇바이 책임</div>
						<div>메잇바이 책임</div>
						<div>메잇바이 책임</div>
						<div className="text-start font-medium">CS 대행</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
						<div>{yesIcon}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
