import { useSignIn } from "@/features/auth/hook/useSignIn"

export function SignInContent() {
	const { formData, setFormData, handleSubmit } = useSignIn()
	return (
		<form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col gap-4">
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
			<input
				type="password"
				placeholder="비밀번호"
				className="w-full rounded border p-2"
				value={formData.password}
				onChange={(e) =>
					setFormData((prev) => ({ ...prev, password: e.target.value }))
				}
				required
			/>
			<button type="submit" className="rounded bg-blue-500 py-2 text-white">
				로그인
			</button>
		</form>
	)
}
