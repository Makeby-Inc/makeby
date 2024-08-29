'use client'

import { Editor } from '@tiptap/react'
import React from 'react'
import { MenuButton, MenuButtonIcon } from './menu-button'
import { ImageUploader } from './image-uploader'

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
	editor: Editor
}

export function MenuBar({ editor }: MenuBarProps) {
	const colorInputRef = React.useRef<HTMLInputElement>(null)

	return (
		<div className="flex items-center divide-x overflow-scroll border-b">
			<div className="flex gap-1 p-1">
				<MenuButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					aria-selected={editor.isActive('heading', { level: 1 })}
				>
					<MenuButtonIcon name="heading1" />
				</MenuButton>
				<MenuButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					aria-selected={editor.isActive('heading', { level: 2 })}
				>
					<MenuButtonIcon name="heading2" />
				</MenuButton>
				<MenuButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					aria-selected={editor.isActive('heading', { level: 3 })}
				>
					<MenuButtonIcon name="heading3" />
				</MenuButton>
				<MenuButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					aria-selected={editor.isActive('heading', { level: 4 })}
				>
					<MenuButtonIcon name="heading4" />
				</MenuButton>
				<MenuButton
					onClick={() => editor.chain().focus().setParagraph().run()}
					aria-selected={editor.isActive('paragraph')}
				>
					<MenuButtonIcon name="paragraph" />
				</MenuButton>
			</div>
			<div className="flex gap-1 p-1">
				<MenuButton
					className="relative"
					onClick={() => {
						colorInputRef.current?.click()
					}}
				>
					<div
						className="h-4 w-4 rounded-sm"
						style={{
							backgroundColor: editor.getAttributes('textStyle').color || '#000000'
						}}
					/>

					<input
						ref={colorInputRef}
						className="sr-only"
						type="color"
						onChange={(e) =>
							editor.chain().focus().setColor(e.currentTarget.value).run()
						}
						value={editor.getAttributes('textStyle').color || '#000000'}
					/>
				</MenuButton>
			</div>
			<div className="flex gap-1 p-1">
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleUnderline().run()
					}}
					aria-selected={editor.isActive('underline')}
				>
					<MenuButtonIcon name="underline" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleStrike().run()
					}}
					aria-selected={editor.isActive('strike')}
				>
					<MenuButtonIcon name="strike" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleBlockquote().run()
					}}
					aria-selected={editor.isActive('blockquote')}
				>
					<MenuButtonIcon name="blockquote" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleCodeBlock().run()
					}}
					aria-selected={editor.isActive('codeBlock')}
				>
					<MenuButtonIcon name="codeblock" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().setHorizontalRule().run()
					}}
				>
					<MenuButtonIcon name="horizontalRule" />
				</MenuButton>
			</div>

			<div className="flex gap-1 p-1">
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleBulletList().run()
					}}
					aria-selected={editor.isActive('bulletList')}
				>
					<MenuButtonIcon name="bulletList" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().toggleOrderedList().run()
					}}
					aria-selected={editor.isActive('orderedList')}
				>
					<MenuButtonIcon name="orderedList" />
				</MenuButton>
			</div>
			<div className="flex gap-1 p-1">
				<MenuButton
					onClick={() => {
						editor.chain().focus().setTextAlign('left').run()
					}}
					aria-selected={editor.isActive({ textAlign: 'left' })}
				>
					<MenuButtonIcon name="left" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().setTextAlign('center').run()
					}}
					aria-selected={editor.isActive({ textAlign: 'center' })}
				>
					<MenuButtonIcon name="center" />
				</MenuButton>
				<MenuButton
					onClick={() => {
						editor.chain().focus().setTextAlign('right').run()
					}}
					aria-selected={editor.isActive({ textAlign: 'right' })}
				>
					<MenuButtonIcon name="right" />
				</MenuButton>
			</div>

			<div className="flex gap-1 p-1">
				<ImageUploader
					onFileChange={(v) => {
						if (v) {
							editor.chain().focus().setImage({ src: v }).run()
						}
					}}
				>
					<MenuButton>
						<MenuButtonIcon name="image" />
					</MenuButton>
				</ImageUploader>
			</div>
		</div>
	)
}
