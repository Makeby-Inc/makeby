import { TagInput } from '@design-system/template'
import { type ControllerRenderProps } from '@design-system/ui'
import { forwardRef } from 'react'

interface TagSectionProps {
	options: string[]
}

export const TagSection = forwardRef<
	HTMLInputElement,
	Pick<ControllerRenderProps<TagSectionProps, 'options'>, 'value' | 'onChange'>
>(({ value, onChange }, ref) => {
	return (
		<div className="grid gap-[5px]">
			<TagInput
				ref={ref}
				onChange={(v) => {
					onChange(v)
				}}
				tagList={value}
				maxTagCount={10}
			/>
			<div className="text-secondary-foreground text-sm font-light">
				태그를 입력하고 콤마(,)를 이용해 완료할 수 있으며, 최대 10개 까지 입력할 수
				있어요.
			</div>
		</div>
	)
})
TagSection.displayName = 'TagSection'
