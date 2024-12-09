import { COLORS } from "@/config/style/colors"
import { BORDERRADIUS, FontFamily } from "@/config/style/styles"

module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			FontFamily,
			COLORS,
			BORDERRADIUS,
		},
	},
	plugins: [require("tailwindcss-animate")],
}
