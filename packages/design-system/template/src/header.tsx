'use client'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

/**
 * 상단에 고정되어 있는 헤더입니다.
 * `Header` 내부에 다음과 같은 영역으로 구성할 수 있습니다.
 * - `HeaderLeading`: 왼쪽에 위치하는 영역입니다.
 *    - `showBackButton`: 헤더의 뒤로가기 버튼입니다. 모바일 영역에서만 보입니다.
 * - `HeaderTitle`: 가운데에 위치하는 영역입니다.
 * - `HeaderActions`: 오른쪽에 위치하는 영역입니다.
 * - `HeaderNav`: 네비게이션 메뉴 영역입니다.
 */
const Header = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<header
				className={cn(
					'bg-background/80 sticky top-0 z-50 w-full backdrop-blur-[5px]',
					className
				)}
				ref={ref}
				{...props}
			>
				<section className="pc:px-2xl px-md pc:gap-20 grid grid-cols-[auto,1fr,auto] items-center gap-2 ">
					{children}
				</section>
			</header>
		)
	}
)
Header.displayName = 'Header'

/**
 * 헤더의 왼쪽에 위치하는 영역입니다.
 * @param showBackButton - 뒤로가기 버튼을 보여줄지 여부입니다.
 */
const HeaderLeading = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		showBackButton?: boolean
	}
>(({ className, children, showBackButton, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn('order-first col-start-1 flex items-center', className)}
			{...props}
		>
			{showBackButton ? <HeaderBackButton /> : children}
		</div>
	)
})
HeaderLeading.displayName = 'HeaderLeading'

/**
 * 헤더의 가운데에 위치하는 영역입니다.
 */
const HeaderTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				'order-2 col-start-2 line-clamp-1 w-full items-center justify-center text-center align-middle font-bold',
				className
			)}
			{...props}
		/>
	)
})
HeaderTitle.displayName = 'HeaderTitle'

/**
 * 헤더의 오른쪽에 위치하는 영역입니다.
 */
const HeaderActions = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				'my-md order-last col-start-3 flex h-full items-center justify-end gap-4',
				className
			)}
			{...props}
		/>
	)
})
HeaderActions.displayName = 'HeaderActions'

/**
 * 헤더의 네비게이션 메뉴 영역입니다.
 * @param data - { label: string; href: string, isActive: boolean }[]
 */
const HeaderNav = React.forwardRef<
	HTMLElement,
	React.HTMLAttributes<HTMLElement> & {
		data: { label: string; href: string; isActive: boolean }[]
	}
>(({ className, data, children, ...props }, ref) => {
	const pathname = usePathname()
	return (
		<nav
			ref={ref}
			className={cn('gap-md flex items-center', className)}
			{...props}
		>
			{data.map((v) => (
				<HeaderNavButton
					key={v.href}
					href={v.href}
					selected={pathname === v.href}
					className={cn(!v.isActive && 'hidden')}
				>
					{v.label}
				</HeaderNavButton>
			))}
		</nav>
	)
})
HeaderNav.displayName = 'HeaderNav'

const HeaderNavButton = ({
	selected,
	className,
	...props
}: React.ComponentProps<typeof Link> & {
	selected?: boolean
}) => {
	return (
		<Link
			{...props}
			className={cn(
				'px-md py-lg text-secondary-foreground flex shrink-0 items-center justify-center text-sm font-medium transition-colors',
				selected && 'border-foreground text-foreground border-b-4 pb-5',
				className
			)}
		/>
	)
}

/**
 * 헤더의 뒤로가기 버튼입니다.
 * 모바일 화면에서만 보입니다.
 */
const HeaderBackButton = React.forwardRef<
	HTMLButtonElement,
	React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
	const router = useRouter()
	return (
		<button
			{...props}
			ref={ref}
			className={cn('text-foreground pc:hidden h-6 w-6', className)}
			onClick={() => router.back()}
		>
			<Icon name="ArrowLeftIcon" className="h-full w-full" />
		</button>
	)
})
HeaderBackButton.displayName = 'HeaderBackButton'

export {
	Header,
	HeaderActions,
	HeaderBackButton,
	HeaderLeading,
	HeaderNav,
	HeaderTitle
}
