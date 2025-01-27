export type DataEntry = {
	_id: string
	date: string
	region: string
	time: string
	generation_kw: number
	cumulative_generation_kwh: number
	solar_radiation_w_m2: number
	temperature_c: number
	wind_speed_m_s: number
}
