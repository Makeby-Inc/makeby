import NextAuth from 'next-auth'
import { authOptions } from './auth-option'

export const {
	handlers: { GET, POST },
	auth
} = NextAuth(authOptions)
