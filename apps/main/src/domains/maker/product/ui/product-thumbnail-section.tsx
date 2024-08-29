'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Uploader } from '@design-system/template'
import { Button, type ControllerRenderProps } from '@design-system/ui'
import Image from 'next/image'
import { forwardRef } from 'react'

interface ProductThumbnailSectionProps {
	thumbnailUrl: string
}
export const ProductThumbnailSection = forwardRef<
	HTMLDivElement,
	Pick<
		ControllerRenderProps<ProductThumbnailSectionProps, 'thumbnailUrl'>,
		'value' | 'onChange'
	> & {
		size?: 'sm' | 'md'
		className?: string
	}
>(({ size, value, onChange, className }, ref) => {
	return (
		<div className="flex w-full items-end gap-4">
			<div
				ref={ref}
				className={cn(
					'h-[120px] w-[120px] shrink-0 overflow-hidden rounded-md',
					size === 'sm' && 'h-20 w-20'
				)}
			>
				{value ? (
					<Image
						src={value}
						alt="product-thumbnail"
						width={120}
						height={120}
						className="h-full w-full"
					/>
				) : (
					<div
						className={cn(
							'bg-secondary text-muted-foreground flex h-full w-full items-center justify-center',
							className
						)}
					>
						<Icon
							name="PhotoIcon"
							className={cn('h-20 w-20', size === 'sm' && 'h-[50px] w-[50px]')}
							solid
						/>
					</div>
				)}
			</div>

			<div className="flex items-center gap-2">
				<Uploader
					bucket="images"
					accept="image/*"
					onFileChange={(v) => {
						onChange(v.url)
					}}
				>
					<Button
						type="button"
						size="sm"
						variant="outline"
						className="border-strong text-secondary-foreground"
					>
						업로드
					</Button>
				</Uploader>
				<Button
					type="button"
					size="sm"
					variant="outline"
					className="border-strong text-secondary-foreground"
					onClick={() => {
						onChange('')
					}}
				>
					삭제
				</Button>
			</div>
		</div>
	)
})
ProductThumbnailSection.displayName = 'ProductThumbnailSection'
