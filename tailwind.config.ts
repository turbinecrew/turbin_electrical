import { COLORS } from "./src/config/style/colors"
import { BORDERRADIUS, FontFamily } from "./src/config/style/styles"

module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: COLORS,
			borderRadius: BORDERRADIUS,
			fontFamily: FontFamily,
			animation: {
				"spin-slow": "spin 2s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
