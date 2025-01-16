import { useState } from "react"

export function useSignUp() {
	const [authData, setAuthData] = useState({
		email: "",
		confirmEmail: "",
		password: "",
	})
	const [additionalData, setAdditionalData] = useState({
		businessName: "",
		businessNumber: "",
		businessOwner: "",
		businessAddress: "",
	})

	// 이메일 재입력 검증
	const validateEmailsMatch = () => {
		if (authData.email !== authData.confirmEmail) {
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
			email: authData.email,
			password: authData.password,
		})
	}

	return {
		authData,
		setAuthData,
		additionalData,
		setAdditionalData,
		handleSubmit,
		validateEmailsMatch,
	}
}
