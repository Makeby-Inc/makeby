'use client'

import { Icon, IconProps } from '@design-system/icon'
import { cn } from '@core/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

/**
 * 하단에 고정되어 있는 모바일 네비게이션 바입니다.
 */
const BottomNavigator = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				'gap-md px-md py-xs border-border absolute inset-x-0 bottom-0 z-50 flex justify-center border-t bg-white',
				className
			)}
			{...props}
		/>
	)
})
BottomNavigator.displayName = 'BottomNavigator'

/**
 * 네비게이션 바에 들어가는 메뉴입니다.
 * @param href 링크할 주소
 * @param icon 아이콘 이름
 * @param exact 링크가 정확히 일치했을 때에만 선택되도록 설정
 * @param children 표시할 텍스트
 */
const BottomNavigatorMenu = React.forwardRef<
	HTMLAnchorElement,
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		href: string
		icon: IconProps['name']
		exact?: boolean
		children: React.ReactNode
	}
>(({ className, href, exact, icon, children, ...props }, ref) => {
	const pathname = usePathname()
	const selected = pathname === href || !exact ? pathname.includes(href) : false
	return (
		<Link
			ref={ref}
			className={cn(
				'gap-xs text-strong aria-selected:text-primary flex flex-1 flex-col items-center whitespace-nowrap p-2 text-sm font-medium only:flex-initial',
				className
			)}
			href={href}
			aria-selected={selected}
			{...props}
		>
			<Icon name={icon} solid={selected} />
			<span className="text-secondary-foreground whitespace-nowrap text-[10px] font-medium">
				{children}
			</span>
		</Link>
	)
})
BottomNavigatorMenu.displayName = 'BottomNavigatorMenu'

export { BottomNavigator, BottomNavigatorMenu }
