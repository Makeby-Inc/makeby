import { inngest } from '../client'

export const SAMPLE_EVENT_KEY = 'app/sample-function'
/**
 * 예시 Inggest function
 *
 * 해당 함수는 Inngest SDK를 사용하여 event 기반 step을 수행합니다.
 * Inngest는 step 별로 별도의 HTTP 요청을 생성하며, 수행한 결과를 대시보드에 기록하고, 비동기, 동기 모두 가능합니다.
 * @see {@link https://www.inngest.com/docs/learn/inngest-functions}
 */
export const sampleFunction = inngest.createFunction(
	{ id: 'sample-function' },
	{ event: SAMPLE_EVENT_KEY },
	async ({ event, step }) => {
		const { message } = event.data as any

		step.run('sample-step', () => {
			return { message }
		})

		return { event, body: 'Sample function execute success' }
	}
)
