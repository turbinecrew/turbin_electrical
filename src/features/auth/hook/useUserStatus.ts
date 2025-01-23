// import { useQuery } from "@tanstack/react-query"

// import { getUserStatus } from "../api/getUserApi"
// interface UserResponse {
// 	authenticated: boolean
// 	message: string
// 	user?: any
// }
// export const useAuthStatus = () => {
// 	return useQuery({
// 		queryKey: ["authStatus"],
// 		queryFn: getUserStatus,
// 		retry: false, // 인증 요청이므로 재시도 비활성화
// 		onSuccess: (data: {
// 			authenticated: boolean
// 			user: string
// 			message: any
// 		}) => {
// 			if (data.authenticated) {
// 				console.log("사용자 인증 성공:", data.user)
// 			} else {
// 				console.log("사용자 인증 실패:", data.message)
// 			}
// 		},
// 		onError: (error: any) => {
// 			console.error("인증 상태 확인 중 오류 발생:", error)
// 		},
// 	})
// }
