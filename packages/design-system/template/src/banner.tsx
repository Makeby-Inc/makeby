import { cn } from '@core/utils'
import React from 'react'

interface BannerProps {
	title: string
	description?: string
	prefix?: React.ReactNode
	suffix?: React.ReactNode
	className?: string
}

/**
 * 배너 컴포넌트입니다.
 * @param title 제목
 * @param description 설명
 * @param prefix 제목 앞에 추가할 요소
 * @param suffix 제목 뒤에 추가할 요소
 * @example
 * ```tsx
 * <Banner
 *   title="7월 리포트가 도착했어요"
 *   description="지금 확인해보세요"
 *   prefix={<Icon name="BellAlertIcon" />}
 *   suffix={<Button><Icon name="ArrowRightIcon" /></Button>}
 * />
 * ```
 */
export function Banner({
	className,
	title,
	description,
	prefix,
	suffix
}: BannerProps) {
	return (
		<div
			className={cn(
				'bg-primary/[0.08] group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-lg p-4',
				className
			)}
		>
			{prefix && <div>{prefix}</div>}
			<div className="flex-1">
				<p className="whitespace-pre-line font-semibold">{title}</p>
				{description && <p>{description}</p>}
			</div>
			{suffix && <div>{suffix}</div>}
		</div>
	)
}
Banner.displayName = 'Banner'
