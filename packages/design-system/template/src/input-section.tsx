import { cn } from '@core/utils'

interface InputSectionTestProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string
	guideText?: string
	actionPosition?: 'bottom' | 'right'
}

/**
 * 프로필 설정 등에서 활용되는 입력 섹션 컴포넌트입니다.
 * - 제목과 가이드 문구를 포함하고 있고, `children`으로 `InputSlot`과 `InputActionSlot`을 포함합니다.
 * @params title 제목
 * @params guideText 가이드 문구
 * @params actionPosition `InputActionSlot`의 위치를 `InputSlot`의 아래 또는 오른쪽으로 설정합니다.
 * @example
 * <InputSection title="Title" guideText="가이드 문구가 들어갑니다">
 *   <InputSlot>
 *     <Input type="text" placeholder="이름을 입력해주세요" />
 *   </InputSlot>
 *   <InputActionSlot>
 *     <Button>저장하기</Button>
 *   </InputActionSlot>
 * </InputSection>
 */
function InputSection({
	title,
	guideText,
	actionPosition = 'right',
	className,
	children
}: InputSectionTestProps) {
	return (
		<div
			className={cn(
				'divide-border bg-background grid h-fit w-full divide-y overflow-hidden rounded-lg border',
				className
			)}
		>
			<div className="bg-secondary grid gap-1 p-6">
				<h2 className="font-semibold">{title}</h2>
				{guideText && (
					<span className="text-secondary-foreground text-sm">{guideText}</span>
				)}
			</div>
			<div
				className={cn(
					'flex justify-between gap-2 p-4',
					actionPosition === 'bottom' && 'flex-col'
				)}
			>
				{children}
			</div>
		</div>
	)
}
InputSection.displayName = 'InputSection'

/**
 * InputSection 내부에서 사용되는 컴포넌트입니다.
 * - 주로 Input, Uploader 등 입력받는 컴포넌트를 표시할 때 사용합니다.
 * @example
 * <InputSlot>
 *   <Input type="text" placeholder="이름을 입력해주세요" />
 * </InputSlot>
 */
function InputSlot({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('order-1', className)} {...props} />
}
InputSlot.displayName = 'InputSlot'

/**
 * InputSection 내부에서 사용되는 컴포넌트입니다.
 * - 주로 실행할 버튼 컴포넌트를 표시할 때 사용합니다.
 * @example
 * <InputActionSlot>
 *   <Button>저장하기</Button>
 * </InputActionSlot>
 */
function InputActionSlot({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('order-2 flex h-fit justify-end self-end', className)}
			{...props}
		/>
	)
}
InputActionSlot.displayName = 'InputActionSlot'

export { InputActionSlot, InputSection, InputSlot }
