'use client'

import { fileToBase64 } from '@core/utils'
import { cloneElement, useRef } from 'react'

interface ImageUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactElement
	onFileChange: (value: string) => void
	accept?: string
}

export function ImageUploader(props: ImageUploaderProps) {
	const { accept, children, onFileChange, ...restProps } = props
	const fileInputRef = useRef<HTMLInputElement>(null)

	const clone = cloneElement(children, {
		onClick: () => {
			fileInputRef.current?.click()
		}
	})

	return (
		<div {...restProps}>
			{clone}
			<input
				ref={fileInputRef}
				type="file"
				hidden
				accept={accept || '*'}
				onClick={(e) => {
					e.currentTarget.value = ''
				}}
				onChange={(e) => {
					if (!e.target.files) return
					const file = e.target.files[0]
					if (!file) return
					fileToBase64(file, (result) => {
						onFileChange(result?.toString() || '')
					})
				}}
			/>
		</div>
	)
}
