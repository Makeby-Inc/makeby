'use server'

import { inngest } from '../client'
import { SAMPLE_EVENT_KEY } from '../functions'

/**
 * 예시 Inngest function을 트리거하는 예시 함수
 *
 * @param dto
 * @example await invokeSampleFunction({ message: "Hello World" })
 */
export const invokeSampleFunction = async (dto: any) => {
	return await inngest.send({
		name: SAMPLE_EVENT_KEY,
		data: {
			...dto
		}
	})
}
