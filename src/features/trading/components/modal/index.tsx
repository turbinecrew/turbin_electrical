"use client"

import { useState, useMemo } from "react"

import TbButton from "@/common/components/button/TbButton"
import {
	Modal,
	ModalContext,
	ModalFooter,
	ModalHeader,
} from "@/common/components/modal"

interface TradeModalPT {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
	currentSMP: number
	currentREC: number
}

export default function TradeModal({
	isOpen,
	setIsOpen,
	currentSMP = 110,
	currentREC = 20,
}: TradeModalPT) {
	const [power, setPower] = useState<number>(0)
	const [bidPrice, setBidPrice] = useState<number>(0)

	const finalPrice = useMemo(
		() => power * (bidPrice + currentREC),
		[power, bidPrice, currentREC],
	)

	const handleReset = () => {
		setPower(0)
		setBidPrice(0)
	}

	const handleBidSubmit = () => {
		console.log({
			power,
			bidPrice,
			finalPrice,
		})
		alert("입찰 요청이 제출되었습니다!")
		setIsOpen(false)
	}

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<h2 className="text-xl font-bold">전력 거래 입찰</h2>
			</ModalHeader>
			<ModalContext>
				<p className="mb-4 text-sm text-gray-700">
					원하는 전력량(kWh)과 입찰 가격(₩/kWh)을 입력하세요.
					<br />
					REC 금액이 포함된 최종 금액이 자동으로 계산됩니다.
				</p>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							전력량 (kWh)
						</label>
						<input
							type="number"
							value={power}
							onChange={(e) => setPower(Math.max(0, Number(e.target.value)))}
							placeholder="전력량 입력"
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							입찰 가격 (₩/kWh)
						</label>
						<input
							type="number"
							value={bidPrice}
							onChange={(e) => setBidPrice(Math.max(0, Number(e.target.value)))}
							placeholder="입찰 가격 입력"
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
						/>
					</div>
				</div>
				<div className="border-t border-gray-300 pt-4">
					<p className="text-sm font-medium text-gray-700">
						현재 SMP:{" "}
						<span className="font-bold text-blue-500">
							₩{currentSMP.toLocaleString()}/kWh
						</span>
					</p>
					<p className="text-sm font-medium text-gray-700">
						REC 금액:{" "}
						<span className="font-bold text-green-500">
							₩{currentREC.toLocaleString()}/kWh
						</span>
					</p>
					<p className="text-sm font-medium text-gray-700">
						최종 금액:{" "}
						<span className="font-bold text-purple-500">
							₩{finalPrice.toLocaleString()}
						</span>
					</p>
				</div>
			</ModalContext>
			<ModalFooter>
				<div className="flex justify-between space-x-4">
					<TbButton
						onClick={handleReset}
						color="gray"
						size="md"
						className="bg-gray-200 hover:bg-gray-300"
					>
						초기화
					</TbButton>
					<TbButton onClick={handleBidSubmit} color="green" size="md">
						입찰 제출하기
					</TbButton>
				</div>
			</ModalFooter>
		</Modal>
	)
}
