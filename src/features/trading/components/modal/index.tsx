"use client"

import { useState } from "react"

import {
	Modal,
	ModalContext,
	ModalFooter,
	ModalHeader,
} from "@/common/components/modal"

interface TradeModalProps {
	isOpen: boolean
	onClose: () => void
	tradeType: "buy" | "sell"
}

export default function TradeModal({
	isOpen,
	onClose,
	tradeType,
}: TradeModalProps) {
	const [smpPrice, setSmpPrice] = useState<number>(0)
	const [recPrice, setRecPrice] = useState<number>(0)
	const [quantity, setQuantity] = useState<number>(0)

	const handleTrade = () => {
		console.log({
			action: tradeType === "buy" ? "매수" : "매도",
			smpPrice,
			recPrice,
			quantity,
		})
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalHeader>
				<h2 className="text-xl font-bold">
					{tradeType === "buy" ? "매수" : "매도"} 거래
				</h2>
			</ModalHeader>
			<ModalContext>
				<div className="space-y-4">
					{/* SMP Price Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							SMP 현재가 (원)
						</label>
						<input
							type="number"
							value={smpPrice}
							onChange={(e) => setSmpPrice(Math.max(0, Number(e.target.value)))}
							placeholder="SMP 가격 입력"
							className="mt-1 w-full rounded border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
						/>
					</div>

					{/* REC Price Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							REC 현재가 (원)
						</label>
						<input
							type="number"
							value={recPrice}
							onChange={(e) => setRecPrice(Math.max(0, Number(e.target.value)))}
							placeholder="REC 가격 입력"
							className="mt-1 w-full rounded border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
						/>
					</div>

					{/* Quantity Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							거래 수량 (MWh)
						</label>
						<input
							type="number"
							value={quantity}
							onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
							placeholder="거래 수량 입력"
							className="mt-1 w-full rounded border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
						/>
					</div>
				</div>
			</ModalContext>
			<ModalFooter>
				<div className="flex justify-end space-x-4">
					{/* Cancel Button */}
					<button
						onClick={onClose}
						className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
					>
						취소
					</button>
					{/* Confirm Button */}
					<button
						onClick={handleTrade}
						className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						{tradeType === "buy" ? "매수" : "매도"} 확인
					</button>
				</div>
			</ModalFooter>
		</Modal>
	)
}
