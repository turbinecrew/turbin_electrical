import { useState } from "react"

import { useAuth } from "@/features/auth/hook/useAuth"

export function SignInContent() {
	const { loginMutation } = useAuth()
	const [formData, setFormData] = useState({ email: "", password: "" })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		loginMutation.mutate(formData)
		window.location.href = "./"
	}

	return (
		<form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col gap-4">
			<input
				type="email"
				name="email"
				placeholder="이메일"
				className="w-full rounded border p-2"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="비밀번호"
				className="w-full rounded border p-2"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<button type="submit" className="rounded bg-blue-500 py-2 text-white">
				로그인
			</button>
		</form>
	)
}
