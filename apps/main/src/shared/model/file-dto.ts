import * as z from 'zod'

export const fileDto = z.object({
	id: z.string(),
	fileName: z.string(),
	fileUrl: z.string()
})
export type FileData = z.infer<typeof fileDto>
