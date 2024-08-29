import { base64ToBuffer } from '@core/utils'
import { createClient } from '@supabase/supabase-js'
import { BucketName } from './type'

class SupabaseService {
	private readonly supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL || '',
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
	)

	get client() {
		return this.supabase
	}

	/**
	 * 리치에디터로 작성된 html 본문을 파싱합니다.
	 * 이미지가 있으면 서버에 업로드 후, img 태그의 src 속성이 url로 변경된 본문을 반환합니다.
	 * @param content 리치에디터로 작성된 html 본문
	 * @param bucketName 업로드할 버킷 이름
	 */
	async uploadHTML(content: string, bucketName: string) {
		let finalContent = content
		const parsedData = content.matchAll(/src="(.*?)"/g)

		for (const v of parsedData) {
			const imageName = Date.now() + '.png'
			const file = base64ToBuffer(v[1] as string)

			// supabase storage에 이미지 업로드
			const { data, error } = await this.supabase.storage
				.from(bucketName)
				.upload(imageName, file, {
					contentType: 'image/png',
					upsert: true
				})

			if (data) {
				const imagePath =
					process.env.NEXT_PUBLIC_SUPABASE_URL +
					`/storage/v1/object/public/${bucketName}/` +
					data.path
				finalContent = finalContent.replace(v[1] as string, imagePath)
			}
			if (error) {
				console.log(error)
			}
		}
		return finalContent
	}

	/**
	 *
	 * @param bucket 업로드할 파일의 경로를 입력합니다. (ex. "files", "images", "posts")
	 * @param filePath bucket 내부 파일의 경로를 입력합니다.(= 파일명)
	 * @param file 업로드할 파일
	 * @returns 업로드된 파일의 URL을 반환합니다.
	 */
	async uploadFile(bucket: BucketName, filePath: string, file: File) {
		const origin = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/`
		const { data, error } = await this.supabase.storage
			.from(bucket)
			.upload(filePath, file, {
				upsert: true
			})
		if (data) {
			return origin + data.path
		} else {
			return null
		}
	}
}
export const supabaseService = new SupabaseService()
