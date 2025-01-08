import { useState } from "react"

export function useSignIn() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		console.log("회원가입 데이터:", {
			email: formData.email,
			password: formData.password,
		})
	}

	return {
		formData,
		setFormData,
		handleSubmit,
	}
}
