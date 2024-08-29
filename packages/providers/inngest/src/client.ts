import { Inngest } from 'inngest'

const INNGEST_CLIENT_ID = 'SAMPLE-INNGEST-CLIENT-ID'

/**
 * Inngest SDK 인스턴스
 * @see {@link https://www.inngest.com/docs/quick-start}
 */
export const inngest = new Inngest({
	id: INNGEST_CLIENT_ID
})
