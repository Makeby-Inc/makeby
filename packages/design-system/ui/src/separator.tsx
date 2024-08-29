'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@core/utils'

/**
 * 구분선 컴포넌트입니다.
 * <br/> @param orientation - 구분선의 방향을 지정합니다. `horizontal` 또는 `vertical`을 사용할 수 있습니다. 기본값은 `horizontal`입니다.
 * <br/> @param decorative - 구분선이 장식적인지 여부를 지정합니다. 기본값은 true입니다.
 */
const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = 'horizontal', decorative = true, ...props },
		ref
	) => (
		<SeparatorPrimitive.Root
			className={cn(
				'bg-border shrink-0',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className
			)}
			decorative={decorative}
			orientation={orientation}
			ref={ref}
			{...props}
		/>
	)
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
