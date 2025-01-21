"use client"
import { useState } from "react"

import { useSignUp } from "@/features/auth/hook/useSignUp"

import RegisterModal from "../../register"

export function SignUpContent({
	setIsOpen,
}: {
	setIsOpen: (state: boolean) => void
}) {
	const [isOpenRegister, setIsOpenRegister] = useState(false)
	const { authData, setAuthData, validateEmailsMatch } = useSignUp()

	const openRegisterModal = (e: React.FormEvent) => {
		e.preventDefault()

		// 이메일 검증
		const { isValid } = validateEmailsMatch()
		if (!isValid) {
			alert("이메일이 일치하지 않습니다.")
			return
		}

		setIsOpenRegister(true) // 모달 열기
	}
	return (
		<>
			<form
				onSubmit={openRegisterModal}
				className="flex h-full w-full flex-col gap-4"
			>
				<div className="flex gap-5">
					<input
						type="email"
						placeholder="이메일"
						className="w-full rounded border p-2"
						value={authData.email}
						onChange={(e) =>
							setAuthData((prev) => ({ ...prev, email: e.target.value }))
						}
						required
					/>
					{/* 아직안됨 */}
					<button className="w-24 rounded bg-gray-500 text-white">
						중복 확인
					</button>
				</div>
				<input
					type="email"
					placeholder="이메일 다시 입력"
					className="w-full rounded border p-2"
					value={authData.confirmEmail}
					onChange={(e) =>
						setAuthData((prev) => ({
							...prev,
							confirmEmail: e.target.value,
						}))
					}
					required
				/>
				<input
					type="password"
					placeholder="비밀번호"
					className="w-full rounded border p-2"
					value={authData.password}
					onChange={(e) =>
						setAuthData((prev) => ({
							...prev,
							password: e.target.value,
						}))
					}
					required
				/>
				<button type="submit" className="rounded bg-green-500 py-2 text-white">
					회원가입
				</button>
			</form>
			<RegisterModal
				isOpen={isOpenRegister}
				setIsOpen={setIsOpenRegister}
				onRegisterComplete={setIsOpen}
			/>
		</>
	)
}
