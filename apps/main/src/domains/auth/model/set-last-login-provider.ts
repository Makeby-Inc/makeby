import { type SocialLoginProviders } from '@design-system/template'
import { LocalStorageManager } from '~/shared/utils'

interface ProviderData {
	provider: SocialLoginProviders
	timestamp: number
}

const LAST_LOGIN_PROVIDER_KEY = 'lastLoginProvider'
const LocalStorage = LocalStorageManager()

/**
 * LocalStorage에 마지막으로 로그인 한 provider를 저장합니다.
 */
export const setLastLoginProvider = (provider: SocialLoginProviders) => {
	const currentTime = Date.now()
	const data: ProviderData = {
		provider,
		timestamp: currentTime
	}
	LocalStorage.setItem(LAST_LOGIN_PROVIDER_KEY, JSON.stringify(data))
}

/**
 * LocalStorage에 저장된 마지막 로그인 provider를 가져옵니다.
 */
export const getLastLoginProvider = (): SocialLoginProviders | null => {
	const storedData = LocalStorage.getItem(LAST_LOGIN_PROVIDER_KEY)
	if (storedData) {
		const data = JSON.parse(storedData) as ProviderData
		const currentTime = Date.now()
		const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000
		if (currentTime - data.timestamp < twoDaysInMilliseconds) {
			return data.provider
		}
		LocalStorage.removeItem(LAST_LOGIN_PROVIDER_KEY) // 이틀이 지난 경우 삭제
	}
	return null
}
