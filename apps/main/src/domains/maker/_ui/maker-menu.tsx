'use client'

import { cn } from '@core/utils'
import { Button, Separator } from '@design-system/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@design-system/icon'
import { MakerSocialLabel, type MakerSocialLabelProps } from '#/shop'
import { ProfileAvatar } from '~/shared'

interface MakerMenuProps {
	makerImageUrl: string
	makerName: string
	socialNetworkIds: MakerSocialLabelProps[]
	sellCount: number
	reviewCount: number
}

export function MakerMenu({
	makerImageUrl,
	makerName,
	socialNetworkIds,
	sellCount,
	reviewCount
}: MakerMenuProps) {
	const currentPath = usePathname()

	const data = [
		{
			label: '내 상품 내역',
			href: '/maker/dashboard/product'
		},
		{
			label: '판매 내역',
			href: '/maker/dashboard/order'
		},
		{
			label: '정산 내역',
			href: '/maker/dashboard/calculation'
		}
	]

	return (
		<div className="max-pc:p-4 grid h-fit w-full gap-4">
			<div className="border-strong w-full gap-5 rounded-lg border">
				<div className="flex flex-col justify-center gap-5 p-5">
					<div className="flex items-start gap-4">
						<ProfileAvatar
							imageUrl={makerImageUrl}
							name={makerName}
							size="sm"
							isDefaultLogo
							className="border-strong border"
						/>
						<div className="flex flex-1 flex-col gap-[5px]">
							<div className="text-sm font-semibold">{makerName}</div>
							<div className="flex flex-wrap gap-1">
								{socialNetworkIds.map((socialNetworkId) => (
									<MakerSocialLabel
										key={socialNetworkId.socialId}
										{...socialNetworkId}
									/>
								))}
							</div>
						</div>
						<Button
							options="icon"
							variant="ghost"
							className="text-secondary-foreground pc:hidden h-fit w-fit self-center"
							asChild
						>
							<Link href="/maker/edit">
								<Icon name="Cog6ToothIcon" solid />
							</Link>
						</Button>
					</div>
					<Button
						className="max-pc:hidden border-strong text-secondary-foreground whitespace-nowrap font-semibold"
						variant="outline"
						asChild
					>
						<Link href="/maker/edit">메이커 정보 수정</Link>
					</Button>
				</div>
				<Separator orientation="horizontal" className="w-full" />
				<div className="flex w-full items-center gap-6 px-6 py-5">
					<SalesInformation title="누적 판매" value={`${sellCount}회`} />
					<Separator orientation="vertical" className="h-11" />
					<SalesInformation title="상품 리뷰" value={`${reviewCount}건`} />
				</div>
			</div>

			<div className="max-pc:hidden grid divide-y">
				{data.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							'text-secondary-foreground py-[20px] font-medium',
							currentPath === item.href && 'text-foreground font-semibold'
						)}
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	)
}

function SalesInformation({ title, value }: { title: string; value: string }) {
	return (
		<div className="grid flex-1 justify-center gap-2 text-center">
			<div className="text-secondary-foreground text-xs font-medium">{title}</div>
			<div className="font-semibold">{value}</div>
		</div>
	)
}
