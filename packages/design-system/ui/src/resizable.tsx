'use client'

import * as ResizablePrimitive from 'react-resizable-panels'
import { Icon } from '@design-system/icon'
import { cn } from '@core/utils'

/**
 * 크기 조정이 가능한 패널 그룹 컴포넌트입니다.
 * 
 * <br/> @example
 * ```tsx
 * <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
    <ResizablePanel defaultSize={50}>
      <div className="flex h-[200px] items-center justify-center p-6">
        <span className="font-semibold">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
 * ```
 */
function ResizablePanelGroup({
	className,
	...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
	return (
		<ResizablePrimitive.PanelGroup
			className={cn(
				'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
				className
			)}
			{...props}
		/>
	)
}

const ResizablePanel = ResizablePrimitive.Panel

interface ResizableHandleProps
	extends React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> {
	withHandle?: boolean
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizableHandleProps) {
	return (
		<ResizablePrimitive.PanelResizeHandle
			className={cn(
				'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
				className
			)}
			{...props}
		>
			{withHandle ? (
				<div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border">
					<Icon name="EllipsisVerticalIcon" className="h-3 w-3" />
				</div>
			) : null}
		</ResizablePrimitive.PanelResizeHandle>
	)
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
