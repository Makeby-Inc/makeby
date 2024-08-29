import { cn } from '@core/utils'
import Link from 'next/link'
import React from 'react'
import { Logo } from './logo'

/**
 * 페이지 하단에서 사용되는 푸터입니다.
 * `Footer` 내부에 다음과 같은 영역으로 구성할 수 있습니다.
 * - `FooterInfo` : 로고 하단(데스크탑)/최하단(모바일)에 위치하는 영역입니다.
 * - `FooterMenu`: 오른쪽(데스크탑)/중앙(모바일)에 위치하는 영역입니다. 푸터 링크를 표시합니다.
 * - `FooterDescription`: 회사명, 사업자등록번호 등 회사 정보를 표시할 때 사용합니다.
 *
 * @example
 * ```tsx
 * <Footer>
 *   <FooterInfo>
 *     <FooterDescription data={[{label: '사업자등록번호', value: '000-00-00000'}]} />
 *   </FooterInfo>
 *   <FooterMenu data={[{label:"More", links: [{title: "About", link: "/about"}, {title: "Contact", link: "/contact"}]}]} />
 * </Footer>
 * ```
 */
function Footer({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className="bg-secondary w-full">
			<section
				className={cn(
					'pc:px-0 pc:py-20 pc:grid-cols-[auto,1fr,auto] pc:gap-x-20 pc:gap-y-xl grid grid-cols-1 gap-10 px-4 py-[60px]',
					className
				)}
				{...props}
			>
				<div className="flex justify-start">
					<Logo size="md" />
				</div>
				{children}
			</section>
		</footer>
	)
}
Footer.displayName = 'Footer'

function FooterInfo({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('order-3 flex flex-col items-start', className)}
			{...props}
		/>
	)
}
FooterInfo.displayName = 'FooterInfo'

function FooterDescription({
	className,
	data,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	data: { label: string; value: string }[]
}) {
	return (
		<div className={cn('gap-xs order-3 flex flex-col', className)} {...props}>
			{data.map((v, i) => (
				<FooterValue key={i} {...v} />
			))}
		</div>
	)
}
FooterDescription.displayName = 'FooterDescription'

function FooterValue({
	className,
	label,
	value,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	label: string
	value: string
}) {
	return (
		<div
			className={cn('gap-xs flex items-start text-sm font-medium', className)}
			{...props}
		>
			<div className="text-secondary-foreground text-nowrap">{label}</div>
			<div className="text-foreground">{value}</div>
		</div>
	)
}

function FooterMenu({
	data,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	data: {
		label: string
		value: string
	}[]
}) {
	return (
		<div
			className={cn(
				'pc:px-10 pc:flex-row pc:gap-[60px] order-2 flex flex-col justify-center gap-3 px-0',
				className
			)}
			{...props}
		>
			{data.map((link) => (
				<FooterLink key={link.label} {...link} />
			))}
		</div>
	)
}
FooterMenu.displayName = 'FooterMenu'

function FooterLink({
	label,
	value,
	className,
	...props
}: React.HTMLAttributes<HTMLAnchorElement> & {
	label: string
	value: string
}) {
	return (
		<Link href={value} className={cn('text-sm', className)} {...props}>
			{label}
		</Link>
	)
}

export { Footer, FooterDescription, FooterInfo, FooterMenu }
