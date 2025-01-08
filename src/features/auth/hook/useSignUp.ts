import { useState } from "react"

export function useSignUp() {
	const [formData, setFormData] = useState({
		email: "",
		confirmEmail: "",
		password: "",
	})

	// 이메일 재입력 검증
	const validateEmailsMatch = () => {
		if (formData.email !== formData.confirmEmail) {
			return {
				isValid: false,
				message: "이메일이 일치하지 않습니다.",
			}
		}
		return { isValid: true, message: "" }
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// 이메일 일치 여부 확인
		const { isValid } = validateEmailsMatch()
		if (!isValid) {
			alert("이메일이 일치하지 않습니다.")
			return
		}

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
