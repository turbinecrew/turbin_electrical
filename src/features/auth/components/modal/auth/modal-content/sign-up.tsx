import { useSignUp } from "@/features/auth/hook/useSignUp"

export function SignUpContent() {
	const { formData, setFormData, handleSubmit } = useSignUp()
	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-4">
			<div className="flex gap-5">
				<input
					type="email"
					placeholder="이메일"
					className="w-full rounded border p-2"
					value={formData.email}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, email: e.target.value }))
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
				value={formData.confirmEmail}
				onChange={(e) =>
					setFormData((prev) => ({
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
				value={formData.password}
				onChange={(e) =>
					setFormData((prev) => ({
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
	)
}
