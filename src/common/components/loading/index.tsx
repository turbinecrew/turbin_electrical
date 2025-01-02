import { Loader } from "lucide-react"

export const LoadingComponent = () => {
	return (
		<div className="flex h-[40vh] w-[80%] flex-col items-center justify-center">
			<div className="animate-spin-slow">
				<Loader size={48} />
			</div>
			<p className="mt-4 text-lg font-bold text-gray-500">Loading...</p>
		</div>
	)
}
