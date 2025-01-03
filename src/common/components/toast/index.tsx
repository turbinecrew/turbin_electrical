import React from "react"

type ToastPT = {
	message: string
	className?: string // Optional className for styling
}

export const Toast = ({ message, className }: ToastPT) => {
	return (
		<div
			className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-gray-700 px-4 py-2 text-white shadow-lg ${className || ""}`}
		>
			<div className="flex items-center justify-between">
				<p>{message}</p>
				<button
					type="button"
					onClick={() => {
						/* Empty function for testing */
					}}
				>
					<X size={24} />
				</button>
			</div>
		</div>
	)
}

// Usage Example
const MyComponent = () => {
	return (
		<div>
			{/* Your component content */}
			<Toast message="This is a test toast message" />
		</div>
	)
}

export default MyComponent
