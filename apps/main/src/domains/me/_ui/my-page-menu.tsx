import { Separator, Button } from '@design-system/ui'
import Image from 'next/image'
import { commaizeNumber } from '@core/utils'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { type UserInformationDto } from '#/me/_model'
import { ProfileAvatar } from '~/shared'

export function MyPageMenu({ myData }: { myData: UserInformationDto }) {
	const isMaker = !!myData.maker?.id
	return (
		<div className="flex flex-col gap-6 text-sm">
			<div className="pc:flex-row flex w-full flex-col justify-between gap-6 rounded-lg border px-6 py-5">
				<div className="flex gap-4">
					<ProfileAvatar
						imageUrl={myData.image}
						name={myData.name}
						size="sm"
						className="h-[56px] w-[56px] rounded-full border"
					/>

					<div>
						<div className="flex flex-col items-start justify-center">
							<div className="text-lg font-bold">{myData.name}</div>
							<Link href="/me/points" className="group flex items-center gap-1">
								<div className="text-secondary-foreground text-sm">{`사용 가능한 포인트 ${commaizeNumber(
									myData.totalPoint
								)} P`}</div>
								<Icon
									name="ChevronRightIcon"
									size="sm"
									className="text-secondary-foreground flex items-center justify-center transition-transform group-hover:translate-x-2"
								/>
							</Link>
						</div>
					</div>
				</div>
				<Button variant="outline" className="pc:w-fit w-full" asChild>
					<Link href="/me/profile">회원 정보 수정</Link>
				</Button>
			</div>
			<div>
				<div className="text-secondary-foreground py-3">쇼핑</div>
				<Separator className="bg-strong" />
				<NavItem label="찜목록" href="/me/likes " />
				<Separator />
				<NavItem label="주문내역" href="/me/orders" />
				<Separator />
			</div>
			<div>
				<div className="text-secondary-foreground py-3 ">중고 거래</div>
				<Separator className="bg-strong" />
				<NavItem label="채팅" href="/me/chats" />
				<Separator />
				<NavItem label="내 중고 거래" href="/me/fleamarket/products" />
				<Separator />
			</div>
			<div>
				<div className="text-secondary-foreground py-3 ">기타</div>
				<Separator className="bg-strong" />
				<NavItem
					label={isMaker ? '메이커' : '메이커 신청'}
					href={isMaker ? '/maker' : '/maker/register'}
				/>
				<Separator />
				<NavItem label="고객센터" href="/faqs" />
				<Separator />
			</div>
		</div>
	)
}

interface NavItemProps {
	label: string
	href: string
}

function NavItem({ label, href }: NavItemProps) {
	return (
		<Link href={href} className="group">
			<div className="flex items-center gap-0.5 py-4 font-semibold">
				<span>{label}</span>
				<Icon
					className="opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
					name="ChevronRightIcon"
					size="sm"
				/>
			</div>
		</Link>
	)
}
