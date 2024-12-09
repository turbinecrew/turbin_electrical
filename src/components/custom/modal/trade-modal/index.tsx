import React from "react"
import Modal from "./Modal"

type TradeModalProps = {
	isOpen: boolean
	closeModal: () => void
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, closeModal }) => {
	return (
		<Modal
			isOpen={isOpen}
			closeModal={closeModal}
			title="Trade"
			content={<p>This is the trade modal content.</p>}
			footer={
				<div className="flex justify-end">
					<button
						type="button"
						onClick={closeModal}
						className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
					>
						Cancel
					</button>
					<button
						type="button"
						className="rounded bg-blue-500 px-4 py-2 text-white"
					>
						Confirm
					</button>
				</div>
			}
		/>
	)
}

export default TradeModal
