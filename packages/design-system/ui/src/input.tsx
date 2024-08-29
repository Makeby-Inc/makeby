import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export const inputVariants = cva(
	'bg-background ring-strong placeholder:text-muted-foreground text-foreground focus:ring-primary disabled:bg-muted disabled:text-muted-foreground w-full rounded-md shadow-sm outline-none ring-1 ring-inset focus:ring-2 disabled:shadow-none disabled:ring-0',
	{
		variants: {
			size: {
				default: 'py-sm px-md',
				sm: 'py-xs px-sm text-sm'
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
)
export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, size, ...props }, ref) => {
		return (
			<input
				className={cn(inputVariants({ size }), className)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

const inputHintTextVariants = cva('gap-2xs flex items-center text-sm', {
	variants: {
		type: {
			default: 'text-secondary-foreground',
			destructive: 'text-destructive'
		}
	},
	defaultVariants: {
		type: 'default'
	}
})
export interface InputHintTextProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof inputHintTextVariants> {}
const InputHintText = React.forwardRef<HTMLDivElement, InputHintTextProps>(
	({ className, children, type, ...props }, ref) => {
		return (
			<div
				className={cn(inputHintTextVariants({ type }), className)}
				ref={ref}
				{...props}
			>
				<Icon className="h-4 w-4" name="ExclamationCircleIcon" />
				<p>{children}</p>
			</div>
		)
	}
)
InputHintText.displayName = 'InputHintText'

export { Input, InputHintText }
