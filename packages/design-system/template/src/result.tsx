import { cn } from '@core/utils'
import React from 'react'

/**
 * 작업의 결과를 사용자에게 시각적으로 표시합니다.
 * <br/>폼을 제출한 경우 혹은 비어있는 페이지에 사용됩니다.
 */
function Result({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('px-lg flex flex-col items-center py-20', className)}
			{...props}
		/>
	)
}
Result.displayName = 'Result'

function ResultHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('mb-lg', className)} {...props} />
}
ResultHeader.displayName = 'ResultHeader'

function ResultContent({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('mb-lg space-y-xs text-center', className)} {...props} />
	)
}
ResultContent.displayName = 'ResultContent'

function ResultFooter({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div {...props} />
}
ResultFooter.displayName = 'ResultFooter'

function ResultTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn('text-foreground text-xl font-bold', className)}
			{...props}
		/>
	)
}
ResultTitle.displayName = 'ResultTitle'

function ResultDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn('text-secondary-foreground font-medium', className)}
			{...props}
		/>
	)
}
ResultDescription.displayName = 'ResultDescription'

export {
	Result,
	ResultContent,
	ResultDescription,
	ResultFooter,
	ResultHeader,
	ResultTitle
}
