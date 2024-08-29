import React from 'react'
import { badgeVariants } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { cn } from '@core/utils'

export interface TagInputProps {
	tagList: string[]
	placeholder?: string
	maxTagCount?: number
	className?: string
	onChange: (updatedList: string[]) => void
}

/**
 * 태그를 입력할 수 있는 인풋입니다.
 * 기본 구분자는 쉼표(,)입니다.
 * <br/> @param tagList 태그 목록
 * <br/> @param placeholder 인풋의 placeholder
 * <br/> @param maxTagCount 최대 태그 개수
 * <br/> @param onChange 태그 목록이 변경되었을 때 호출되는 함수
 */
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
	({ tagList, placeholder, maxTagCount, onChange, className }, ref) => {
		const handleRemove = (index: number) => {
			const newTags = tagList.filter((_, i) => index !== i)
			onChange(newTags)
		}
		const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
			e.preventDefault()
			const value = e.currentTarget.value
			// 쉼표 입력 시 태그 추가
			if (e.key === ',') {
				const tag = value.substring(0, value.length - 1)
				e.currentTarget.value = ''
				if (maxTagCount && tagList.length >= maxTagCount) return
				if (tagList.includes(tag)) return
				if (tag.trim() === '') return
				onChange([...tagList, tag])
			}
			// 백스페이스 키 입력 시 태그 삭제
			if (e.key === 'Backspace' && value === '') {
				if (tagList.length > 0) {
					const newTags = tagList.slice(0, tagList.length - 1)
					onChange(newTags)
				}
			}
		}

		return (
			<label htmlFor="editor">
				<div
					className={cn(
						'border-input bg-background ring-offset-background focus-within:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
				>
					<div className="flex w-full flex-wrap gap-2">
						{tagList.map((tag, i) => (
							<div
								key={tag}
								className={cn('bg-secondary rounded-sm px-3 py-2 text-xs font-medium')}
							>
								<span>{tag}</span>
							</div>
						))}

						<input
							id="editor"
							className="placeholder:text-muted-foreground w-full bg-transparent outline-none"
							placeholder={tagList.length === 0 ? placeholder : ''}
							type="text"
							onKeyUp={handleKeyUp}
							ref={ref}
							maxLength={15}
						/>
					</div>
				</div>
				{/* {maxTagCount && (
					<div className="text-muted-foreground mt-2 text-right text-sm">
						{tagList.length} / {maxTagCount}
					</div>
				)} */}
			</label>
		)
	}
)
TagInput.displayName = 'TagInput'

export { TagInput }
