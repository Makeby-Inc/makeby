'use client'

import { cn } from '@core/utils'
import { Icon, IconProps } from '@design-system/icon'
import { OpacityLayer } from '@design-system/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * 사이드바 컴포넌트입니다. 좌측에 고정되어 있는 영역입니다.
 * - Sidebar 내부에 SidebarHeader, SidebarNavigation, SidebarFooter를 세가지 영역으로 나누어 사용할 수 있습니다.
 */
function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<div className={cn('pc:flex bg-background hidden w-[240px]', className)}>
			<div
				className="sticky left-0 top-0 flex h-screen w-full flex-col gap-4"
				{...props}
			/>
		</div>
	)
}
Sidebar.displayName = 'Sidebar'

/**
 * 사이드바 상단에 위치하는 헤더 영역입니다.
 */
function SidebarHeader({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
	return <div className={cn('order-1 flex', className)} {...props} />
}
SidebarHeader.displayName = 'SidebarHeader'

/**
 * 사이드바 중앙에 위치하는 메뉴 영역입니다.
 * - SidebarButton를 사용하여 메뉴 버튼을 추가할 수 있습니다.
 */
function SidebarNavigation({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('order-2 flex flex-1 flex-col', className)} {...props} />
	)
}
SidebarNavigation.displayName = 'SidebarNavigation'

interface SidebarButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
	icon?: IconProps['name']
	exact?: boolean
	disabled?: boolean
	className?: string
}
/**
 * SidebarNavigation 내부에 사용하는 메뉴 버튼입니다.
 * @param children 표시할 텍스트
 * @param href 링크할 주소
 * @param icon 아이콘 이름
 * @param exact 링크가 정확히 일치했을 때에만 선택되도록 설정
 * @param disabled 비활성화 여부
 * @example
 * <SidebarButton href="/" icon="HomeIcon" exact>홈</SidebarButton>
 */
function SidebarButton({
	children,
	href,
	icon,
	exact,
	disabled,
	className,
	...props
}: SidebarButtonProps) {
	const pathname = usePathname()
	const selected = pathname === href || !exact ? pathname.includes(href) : false

	return (
		<Link
			href={href}
			className={cn(
				'rounded-button-sm text-secondary-foreground aria-disabled:text-muted-foreground aria-selected:text-foreground group relative flex items-center gap-3 overflow-hidden px-3 py-2 aria-disabled:pointer-events-none',
				className
			)}
			aria-selected={selected}
			aria-disabled={disabled}
			{...props}
		>
			{/* <OpacityLayer className="group-aria-selected:bg-foreground/[0.08]" /> */}
			{icon && <Icon name={icon} size="sm" solid={selected} />}
			<span className="whitespace-nowrap font-medium">{children}</span>
		</Link>
	)
}
SidebarButton.displayName = 'SidebarButton'

/**
 * 사이드바 하단에 위치하는 푸터 영역입니다.
 */
function SidebarFooter({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
	return <div className={cn('order-3 grid', className)} {...props} />
}
SidebarFooter.displayName = 'SidebarFooter'

export {
	Sidebar,
	SidebarButton,
	SidebarFooter,
	SidebarHeader,
	SidebarNavigation
}
