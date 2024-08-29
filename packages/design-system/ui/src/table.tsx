import * as React from 'react'
import { cn } from '@core/utils'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement> & {
		size?: 'sm' | 'md'
	}
>(({ className, size, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			className={cn('border-muted group w-full caption-bottom text-sm', className)}
			data-size={size}
			ref={ref}
			{...props}
		/>
	</div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		className={cn('[&_tr:last-child]:border-0', className)}
		ref={ref}
		{...props}
	/>
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		className={cn(
			'bg-secondary text-foreground font-bold [&_td]:font-bold',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		className={cn(
			'hover:bg-hover data-[state=selected]:bg-muted border-b transition-colors',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TableRow.displayName = 'TableRow'

const tableDataVariants = cva(
	'p-md group-data-[size=sm]:py-xs text-left align-middle font-medium group-data-[size=sm]:text-sm',
	{
		variants: {
			size: {
				default: 'text-base',
				sm: 'py-xs text-sm'
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
)

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement> &
		VariantProps<typeof tableDataVariants>
>(({ className, size, ...props }, ref) => (
	<th
		className={cn(
			tableDataVariants({ size }),
			'text-secondary-foreground [&:has([role=checkbox])]:pr-0',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement> &
		VariantProps<typeof tableDataVariants>
>(({ className, size, ...props }, ref) => (
	<td
		className={cn(tableDataVariants({ size }), 'text-foreground', className)}
		ref={ref}
		{...props}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		className={cn(
			'text-secondary-foreground px-md py-xs text-sm font-medium',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TableCaption.displayName = 'TableCaption'

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption
}
