import * as React from 'react'
import { cn } from '@core/utils'

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			'border-border bg-background rounded-lg border shadow-sm',
			className
		)}
		ref={ref}
		{...props}
	/>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn('gap-y-2xs p-lg flex flex-col', className)}
		ref={ref}
		{...props}
	/>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	// eslint-disable-next-line jsx-a11y/heading-has-content -- Fixed by Shadcn
	<h3 className={cn('font-bold', className)} ref={ref} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		className={cn('text-secondary-foreground text-sm', className)}
		ref={ref}
		{...props}
	/>
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			'p-lg gap-xs flex flex-col pt-0 text-sm font-medium',
			className
		)}
		ref={ref}
		{...props}
	/>
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn('p-lg flex items-center pt-0', className)}
		ref={ref}
		{...props}
	/>
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
