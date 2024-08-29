import { cn } from '@core/utils'
import { Separator } from '@design-system/ui'

export function ProductDisclaimer(): JSX.Element {
	const deliveryInfo: DisclaimerProps = {
		title: '배송 안내',
		items: [
			{
				title: '배송 업체',
				content: `로젠택배(02-412-9877)`
			},
			{
				title: '배송 지역',
				content: `대한민국 전지역`
			},
			{
				title: '배송 비용',
				content: `3,300원 / 제주 및 도서산간 지역 별도 추가 금액 3,000원 발생`
			},
			{
				title: '배송 기간',
				content: `주말∙공휴일 제외 1일~ 3일`
			},
			{
				title: '유의 사항',
				content:
					`출고 완료했으나 운송장번호 조회는 하루 늦어지는 경우가 있으니 다음날까지 기다려주시기 바랍니다.\n` +
					`주문폭주 및 공급 사정으로 인하여 지연 및 품절이 발생될 수 있습니다.\n` +
					`기본 배송기간 이상 소요되는 상품이거나, 품절 상품은 개별 연락을 드립니다.`
			}
		]
	}

	const cancelInfo: DisclaimerProps = {
		title: '교환 및 반품 안내',
		items: [
			{
				title: '신청 방법',
				content:
					'상품을 수령하신 날로부터 7일 이내로 콜센터(0507-1397-0743) 및 카카오톡 채널 메잇바이로 접수'
			},
			{
				title: '배송 비용',
				content:
					'단순 변심에 의한 반품의 경우 편도 배송비 3,300원, 단순 변심에 의한 교환의 경우 왕복 배송비 6,000원 부과 / 상품 하자 및 오배송의 경우 회수, 재배송비 무료'
			},
			{
				title: '반품 주소',
				content:
					'경기 부천시 원미구 부천로198번길 17 춘의테크노파크2차 202동 1514호'
			},
			{
				title: '유의 사항',
				content:
					`상품 하자, 오배송의 경우 수령일로부터 7일 이내 고객센터 접수 후 교환∙반품이 가능합니다. (교환/반품비 무료)\n` +
					`제품 특성상 단순 변심, 부주의에 의한 제품 손상 및 파손, 사용 및 개봉한 경우 교환/반품이 불가합니다.\n` +
					`카드 결제건 환불 요청 시 결제된 카드로 매출 취소 되어 영업일 기준 5일 이내 환불됩니다.`
			}
		]
	}

	return (
		<div className={cn('grid gap-10')}>
			<Disclaimer title={deliveryInfo.title} items={deliveryInfo.items} />
			<Disclaimer title={cancelInfo.title} items={cancelInfo.items} />
		</div>
	)
}

interface DisclaimerProps {
	title?: string
	items: { title: string; content: string }[]
}

function Disclaimer({ title = '', items }: DisclaimerProps): JSX.Element {
	return (
		<div className="grid gap-3">
			<h3 className={cn('whitespace-nowrap text-lg font-semibold')}>{title}</h3>
			<Separator className="bg-foreground h-0.5 " />
			<ul className="grid gap-2">
				{items.map((item, index) => (
					<li key={index} className="flex gap-2">
						<span className="shrink-0 text-sm font-medium">{item.title}</span>
						<Separator orientation="vertical" className="mt-1 h-[12px]" />
						<span className="whitespace-pre-line break-keep text-sm">
							{item.content}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
