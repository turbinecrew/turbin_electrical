import { COLORS } from "./src/config/style/colors"
import { BORDERRADIUS, FontFamily } from "./src/config/style/styles"

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
