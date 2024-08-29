import { authService } from '@providers/auth'
import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE
} from 'next-safe-action'
import { z } from 'zod'

class ActionError extends Error {}

/**
 * 서버에서 반환된 에러를 처리하는 함수
 * @param e
 * @returns
 */
const handleReturnedServerError = (e: Error) => {
	if (e instanceof Error) {
		return e.message
	}
	return DEFAULT_SERVER_ERROR_MESSAGE
}

/**
 * 일반 서버 액션 클라이언트
 */
export const action = createSafeActionClient({
	handleReturnedServerError(e) {
		if (e instanceof ActionError) {
			return console.error(
				'CUSTOM ERROR LOG FUNCTION, server error message:',
				e.message
			)
		}

		return handleReturnedServerError
	},
	defineMetadataSchema() {
		return z.object({
			actionName: z.string()
		})
	}
}).use(async ({ next, clientInput, metadata }) => {
	const isProduction = process.env.NODE_ENV === 'production'
	if (!isProduction) {
		// something
	}
	const result = await next({ ctx: null })
	return result
})

/**
 * 인증된 사용자 ID를 필수로 가져오는 액션 클라이언트
 */
export const authAction = action.use(async ({ next }) => {
	const userId = await authService.getMyUserIdOrThrow()
	return next({ ctx: { userId } })
})
