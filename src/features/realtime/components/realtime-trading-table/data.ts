import { TradingTablePT } from "./Tcolumn"

export function getData(): TradingTablePT[] {
	return [
		{
			id: "id_1",
			plantName: "서울 태양열 발전소",
			volume: 798,
			bidNumbers: 45,
			matchingButton: { label: "Match", action: "match_1" },
		},
		{
			id: "id_2",
			plantName: "Plant_2",
			volume: 764,
			bidNumbers: 38,
			matchingButton: { label: "Match", action: "match_2" },
		},
		{
			id: "id_3",
			plantName: "Plant_3",
			volume: 955,
			bidNumbers: 15,
			matchingButton: { label: "Match", action: "match_3" },
		},
		{
			id: "id_4",
			plantName: "Plant_4",
			volume: 129,
			bidNumbers: 32,
			matchingButton: { label: "Match", action: "match_4" },
		},
		{
			id: "id_5",
			plantName: "Plant_5",
			volume: 404,
			bidNumbers: 3,
			matchingButton: { label: "Match", action: "match_5" },
		},
		{
			id: "id_6",
			plantName: "Plant_6",
			volume: 196,
			bidNumbers: 18,
			matchingButton: { label: "Match", action: "match_6" },
		},
		{
			id: "id_7",
			plantName: "Plant_7",
			volume: 274,
			bidNumbers: 50,
			matchingButton: { label: "Match", action: "match_7" },
		},
		{
			id: "id_8",
			plantName: "Plant_8",
			volume: 709,
			bidNumbers: 12,
			matchingButton: { label: "Match", action: "match_8" },
		},
		{
			id: "id_9",
			plantName: "Plant_9",
			volume: 517,
			bidNumbers: 42,
			matchingButton: { label: "Match", action: "match_9" },
		},
	]
}
