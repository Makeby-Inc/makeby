'use client'

import { cn } from '@core/utils'
import { Icon, type IconProps } from '@design-system/icon'
import {
	Header,
	HeaderActions,
	HeaderLeading,
	HeaderNav,
	HeaderTitle,
	Logo
} from '@design-system/template'
import { Button } from '@design-system/ui'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { NotificationSheet } from '#/me/notification'
import { RedDot } from '~/shared/ui/red-dot'
import { CartButton } from './cart-button'
import { SearchInput } from './search-input'

export function GlobalHeader({
	isMaker = false,
	isUser = false,
	unreadChatCount = 0,
	className
}: {
	isMaker?: boolean
	isUser?: boolean
	unreadChatCount?: number
	className?: string
}) {
	const currentPath = usePathname()
	const router = useRouter()
	const pathsToHideMobileView = [
		'/start/new',
		'/maker',
		'/shop/cart',
		'/shop/checkout',
		'/shop/detail',
		'/shop/products/',
		'/fleamarket/products/',
		'/fleamarket/profile/',
		'/me',
		'/notices',
		'/faqs',
		'/search'
	]
	const shouldHideMobileView = pathsToHideMobileView.some((path) =>
		currentPath.startsWith(path)
	)

	const DATA = [
		{
			label: '상품',
			href: '/shop/products',
			isActive: true
		},
		{
			label: '중고거래',
			href: '/fleamarket/products',
			isActive: true
		},
		{
			label: '메이커 신청',
			href: '/maker',
			isActive: !isMaker
		},
		{
			label: '메이커',
			href: '/maker/dashboard/product',
			isActive: isMaker
		},
		{
			label: '고객센터',
			href: '/faqs',
			isActive: true
		}
	]

	return (
		<Header
			className={cn(
				'border-b',
				shouldHideMobileView && 'max-pc:hidden',
				className
			)}
		>
			<HeaderLeading>
				<div className="max-pc:hidden flex items-center gap-10">
					<Logo />
					<HeaderNav data={DATA} />
				</div>
				<div className="pc:hidden flex items-center">
					<NotificationSheet />
				</div>
			</HeaderLeading>
			<HeaderTitle>
				<div className="max-pc:hidden relative">
					<SearchInput />
				</div>
				<div className="pc:hidden flex justify-center">
					<Logo />
				</div>
			</HeaderTitle>
			<HeaderActions className="pc:gap-6 flex items-center gap-3">
				<ActionButton
					name="ChatBubbleOvalLeftIcon"
					link="/me/chats"
					className="pc:order-1 relative order-2"
					alertCount={unreadChatCount}
				/>
				{isUser ? (
					<div className="max-pc:hidden">
						<NotificationSheet />
					</div>
				) : null}
				<CartButton className="pc:order-2 order-1" />
				<ActionButton
					name="UserIcon"
					link="/me"
					className="max-pc:hidden pc:order-3"
				/>
			</HeaderActions>
		</Header>
	)
}

function ActionButton({
	name,
	link,
	alertCount,
	className
}: {
	name: IconProps['name']
	link: string
	alertCount?: number
	className?: string
}) {
	return (
		<Button
			variant="ghost"
			options="icon"
			className={cn(
				'h-fit w-fit overflow-visible rounded-none before:hover:opacity-0',
				className
			)}
			asChild
		>
			<Link href={link} className="relative">
				<Icon name={name} />
				{alertCount && alertCount > 0 ? <RedDot count={alertCount} /> : null}
			</Link>
		</Button>
	)
}
