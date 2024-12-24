import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

export default NextAuth({
	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID!,
			clientSecret: process.env.KAKAO_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string | undefined
			return session
		},
	},
})
