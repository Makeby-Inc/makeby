'use client'

import './typography.css'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { MenuBar } from './menu-bar'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

export default function Editor({
	onChange
}: {
	onChange: (v: string) => void
}) {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class: 'outline-none'
			}
		},
		extensions: [
			StarterKit.configure({
				dropcursor: {
					color: 'rgb(0, 0, 0)',
					width: 2
				}
			}),
			Image.configure({ allowBase64: true }),
			TextAlign.configure({
				types: ['heading', 'paragraph']
			}),
			Link,
			Color,
			Underline,
			TextStyle
		],
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange(html)
		},
		content: '<p>Hello World!</p>',
		injectCSS: false
	})

	if (!editor) return null

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent className="typo" editor={editor} />
		</div>
	)
}
