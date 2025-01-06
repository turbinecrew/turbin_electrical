import Image from "next/image"
import { signIn } from "next-auth/react"

export function SocialLoginButton() {
	const handleSocialLogin = (provider: string) => {
		signIn(provider, { redirect: false })
	}

	return (
		<div className="flex gap-8">
			<button
				onClick={() => handleSocialLogin("kakao")}
				className="border-0 bg-transparent p-0"
			>
				<Image
					src="/icons/KaKao.png"
					alt="카카오 로그인"
					width={200} // 아이콘 크기 조절
					height={50}
					quality={100}
				/>
			</button>
			<button
				onClick={() => handleSocialLogin("google")}
				className="border-0 bg-transparent p-0"
			>
				<Image
					src="/icons/Google4x.png"
					alt="구글 로그인"
					width={200} // 아이콘 크기 조절
					height={50}
					quality={100}
				/>
			</button>
			{/* 구글 auth 생성예정 */}
		</div>
	)
}
