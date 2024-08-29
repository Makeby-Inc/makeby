import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@core/models'
import { NextAuthConfig } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import KakaoProvider, { KakaoProfile } from 'next-auth/providers/kakao'
import NaverProvider, { NaverProfile } from 'next-auth/providers/naver'

const authOptions: NextAuthConfig = {
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider<GoogleProfile>({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture
				}
			},
			allowDangerousEmailAccountLinking: true
		}),
		KakaoProvider<KakaoProfile>({
			clientId: process.env.AUTH_KAKAO_ID,
			clientSecret: process.env.AUTH_KAKAO_SECRET,
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.kakao_account?.profile?.nickname,
					email: profile.kakao_account?.email,
					image: profile.kakao_account?.profile?.profile_image_url
				}
			},
			allowDangerousEmailAccountLinking: true
		}),
		NaverProvider<NaverProfile>({
			clientId: process.env.AUTH_NAVER_ID,
			clientSecret: process.env.AUTH_NAVER_SECRET,
			profile(profile) {
				return {
					id: profile.response.id,
					name: profile.response.nickname,
					email: profile.response.email,
					image: profile.response.profile_image
				}
			},
			allowDangerousEmailAccountLinking: true
		})
	],
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true
			}
		},
		csrfToken: {
			name: 'next-auth.csrf-token',
			options: {
				httpOnly: true,
				sameSite: 'lax', // 또는 'lax' 혹은 'strict'로 설정
				path: '/',
				secure: process.env.NODE_ENV === 'production'
			}
		}
	},
	session: {
		strategy: 'jwt'
	},

	callbacks: {
		session: async ({ session, token }) => {
			if (token.sub) {
				session.user.id = token.sub
			}

			return session
		}
	}
}

export { authOptions }
