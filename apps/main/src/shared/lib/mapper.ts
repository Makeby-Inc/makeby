import {
	type PlanType,
	type MakerType,
	type SocialNetworkType,
	type ProductStatus,
	type TradeType,
	type FleaMarketProductStatus
} from '@core/models'

export const makerTypeMap: Record<MakerType, string> = {
	INDIVIDUAL: '개인',
	INDIVIDUAL_BUSINESS: '개인 사업자',
	CORPORATE_BUSINESS: '법인 사업자'
}

export const planTypeMap: Record<PlanType, string> = {
	BASIC: '베이직',
	ESSENTIAL: '에센셜',
	PREMIUM: '프리미엄'
}

export const snsTypeMap: Record<SocialNetworkType, string> = {
	X: 'X (트위터)',
	INSTAGRAM: '인스타그램',
	NAVER: '네이버'
}

export const productStatusMap: Record<ProductStatus, string> = {
	PENDING: '대기중',
	REVIEWING: '심사중',
	IN_PRODUCTION: '제작중',
	RELEASED: '공개중'
}

export const tradeTypeMap: Record<TradeType, string> = {
	SELL: '판매',
	PURCHASE: '구매',
	EXCHANGE: '교환',
	FREE_SHARING: '나눔'
}

export const tradeTypeCommentMap: Record<TradeType, string> = {
	SELL: '',
	PURCHASE: '삽니다',
	EXCHANGE: '교환해요',
	FREE_SHARING: '나눔해요'
}

export const fleamarketProductStatusMap: Record<
	FleaMarketProductStatus,
	string
> = {
	FOR_SALE: '거래가능',
	RESERVED: '예약중',
	SOLD_OUT: '거래완료'
}

export const fleamarketProductTabMap: Record<FleaMarketProductStatus, string> =
	{
		FOR_SALE: '판매중',
		RESERVED: '예약중',
		SOLD_OUT: '판매완료'
	}
