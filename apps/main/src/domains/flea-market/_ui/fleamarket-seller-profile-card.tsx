import { cn } from '@core/utils'
import { Separator } from '@design-system/ui'
import Link from 'next/link'
import { ProfileAvatar } from '~/shared'

interface FleamarketSellerProfileCardProps {
	type?: 'default' | 'profile'
	profileImageUrl?: string
	name: string
	tradingCount: number
	reviewCount: number
	reviewRating: string
	sellerId: string
}

export function FleamarketSellerProfileCard({
	type = 'default',
	profileImageUrl,
	name,
	tradingCount,
	reviewCount,
	reviewRating,
	sellerId
}: FleamarketSellerProfileCardProps) {
	return (
		<Link href={`/fleamarket/profile/${sellerId}`}>
			<div className="border-strong bg-background rounded-lg border transition-shadow hover:shadow">
				{type === 'default' ? (
					<>
						<div className="flex items-center gap-4 px-6 py-4">
							<ProfileAvatar
								size="sm"
								imageUrl={profileImageUrl || ''}
								name={name}
								className="h-[56px] w-[56px]"
							/>
							<div className="flex-1 text-sm font-semibold">{name}</div>
						</div>
						<Separator />
						<div className="flex gap-6 px-6 py-5">
							<TradeDataLabel
								label="성사된 거래"
								value={`${tradingCount}회`}
								type={type}
							/>
							<Separator orientation="vertical" className="h-[42px]" />
							<TradeDataLabel
								label="거래 후기"
								value={`${reviewCount}건`}
								type={type}
							/>
							<Separator orientation="vertical" className="h-[42px]" />
							<TradeDataLabel label="거래 평점" value={reviewRating} type={type} />
						</div>
					</>
				) : (
					<>
						<div className="max-pc:hidden flex items-center gap-8 p-6">
							<ProfileAvatar
								size="sm"
								imageUrl={profileImageUrl || ''}
								name={name}
								className="h-20 w-20"
							/>
							<div className="grid flex-1 gap-2">
								<div className="text-2xl font-semibold">{name}</div>
								<Separator />
								<div className="flex w-fit items-center gap-3">
									<TradeDataLabel
										label="성사된 거래"
										value={`${tradingCount}회`}
										type={type}
									/>
									<Separator orientation="vertical" className="h-4" />
									<TradeDataLabel
										label="거래 후기"
										value={`${reviewCount}건`}
										type={type}
									/>
									<Separator orientation="vertical" className="h-4" />
									<TradeDataLabel
										label="거래 평점"
										value={reviewRating.toString()}
										type={type}
									/>
								</div>
							</div>
						</div>
						<div className="pc:hidden">
							<div className="flex items-center gap-4 px-6 py-4">
								<ProfileAvatar
									size="sm"
									imageUrl={profileImageUrl || ''}
									name={name}
									className="h-[56px] w-[56px]"
								/>
								<div className="flex-1 text-sm font-semibold">{name}</div>
							</div>
							<Separator />
							<div className="flex gap-6 px-6 py-5">
								<TradeDataLabel
									label="성사된 거래"
									value={`${tradingCount}회`}
									type={type}
								/>
								<Separator orientation="vertical" className="h-[42px]" />
								<TradeDataLabel
									label="거래 후기"
									value={`${reviewCount}건`}
									type={type}
								/>
								<Separator orientation="vertical" className="h-[42px]" />
								<TradeDataLabel
									label="거래 평점"
									value={reviewRating.toString()}
									type={type}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</Link>
	)
}

function TradeDataLabel({
	label,
	value,
	type
}: {
	label: string
	value: string
	type: 'default' | 'profile'
}) {
	return (
		<div
			className={cn(
				'flex flex-1 flex-col gap-0.5 text-center',
				type === 'profile' && 'pc:flex-row pc:gap-2 flex-auto'
			)}
		>
			<div
				className={cn(
					'text-secondary-foreground text-xs font-medium',
					type === 'profile' && 'pc:text-base'
				)}
			>
				{label}
			</div>
			<div className={cn('font-semibold', type === 'profile' && 'pc:font-medium')}>
				{value}
			</div>
		</div>
	)
}
