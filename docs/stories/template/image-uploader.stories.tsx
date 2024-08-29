import type { Meta, StoryObj } from '@storybook/react'
import { ImageUploader, UploadedImage } from '@design-system/template'
import { useState } from 'react'

const meta: Meta<typeof ImageUploader> = {
	title: 'Template/ImageUploader',
	component: ImageUploader
}

export default meta

type Story = StoryObj<typeof ImageUploader>

export const Primary: Story = {
	render: (props) => {
		const [images, setImages] = useState<string[]>([])
		return (
			<div className="gap-xs flex items-center">
				<ImageUploader
					{...props}
					onFileChange={(v) => setImages((prev) => [...prev, v as string])}
					options={{
						base64: true
					}}
				/>
				{images.map((image, index) => (
					<UploadedImage
						key={image.slice(0, 10)}
						src={image}
						onRemove={() => {
							setImages((prev) => prev.filter((_, i) => i !== index))
						}}
					/>
				))}
			</div>
		)
	},
	name: 'ImageUploader'
}
