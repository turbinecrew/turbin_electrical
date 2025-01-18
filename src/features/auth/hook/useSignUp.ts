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
export function useTerbinSignUp() {
	const [formData, setFormData] = useState({
		email: "",
		confirmEmail: "",
		password: "",
		businessName: "",
		businessNumber: "",
		businessOwner: "",
		businessAddress: "",
	})

	const [error, setError] = useState<string | null>(null) // 에러 상태 추가
	const [isLoading, setIsLoading] = useState(false) // 로딩 상태 추가
	const [isSuccess, setIsSuccess] = useState(false) // 성공 상태 추가

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

	// 비밀번호 검증
	const validatePassword = () => {
		if (formData.password.length < 6) {
			return {
				isValid: false,
				message: "비밀번호는 최소 6자 이상이어야 합니다.",
			}
		}
		return { isValid: true, message: "" }
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true) // 제출 시 로딩 시작
		setError(null) // 에러 초기화

		// 이메일 일치 여부 확인
		const { isValid: isEmailValid, message: emailMessage } =
			validateEmailsMatch()
		if (!isEmailValid) {
			setError(emailMessage)
			setIsLoading(false)
			return
		}

		// 비밀번호 검증
		const { isValid: isPasswordValid, message: passwordMessage } =
			validatePassword()
		if (!isPasswordValid) {
			setError(passwordMessage)
			setIsLoading(false)
			return
		}

		try {
			// 서버로 회원가입 요청
			const response = await fetch("/api/Auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (response.ok) {
				setIsSuccess(true) // 성공 메시지
				alert("회원가입이 완료되었습니다.")
			} else {
				setError(data.message || "회원가입에 실패했습니다.")
			}
		} catch (error) {
			setError("서버 오류가 발생했습니다.")
		} finally {
			setIsLoading(false) // 로딩 종료
		}
	}

	return {
		formData,
		setFormData,
		handleSubmit,
		error,
		isLoading,
		isSuccess,
	}
}
