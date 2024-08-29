import { NextAuthConfig } from 'next-auth'
import { auth } from './auth'
import { authOptions } from './auth-option'

class AuthService {
	constructor(private readonly options: NextAuthConfig) {}

	get getAuthOptions() {
		return this.options
	}

	async getMySession() {
		const session = await auth()
		return session
	}

	async getMyUserIdOrThrow() {
		const session = await this.getMySession()
		if (!session) {
			throw new Error('Session is not found')
		}
		return session.user.id
	}
}

export const authService = new AuthService(authOptions)
