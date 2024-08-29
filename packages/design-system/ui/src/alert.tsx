import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@core/utils'
import type { IconProps } from '@design-system/icon'
import { Icon } from '@design-system/icon'

const alertVariants = cva(
	'p-md gap-xs flex w-full items-start rounded-md border shadow-xl',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'border-destructive text-destructive [&_div]:text-destructive [&_h5]:text-destructive'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof alertVariants> & {
			icon?: IconProps['name']
		}
>(({ className, variant, icon, children, ...props }, ref) => (
	<div
		className={cn(alertVariants({ variant }), className)}
		ref={ref}
		role="alert"
		{...props}
	>
		{icon ? <Icon className="h-4 w-4" name={icon} /> : null}
		<div className="space-y-2xs">{children}</div>
	</div>
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	// eslint-disable-next-line jsx-a11y/heading-has-content -- Fixed by Shadcn
	<h5
		className={cn('text-foreground text-sm font-medium', className)}
		ref={ref}
		{...props}
	/>
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn('text-secondary-foreground text-sm', className)}
		ref={ref}
		{...props}
	/>
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
