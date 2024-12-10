import { COLORS } from "./src/config/style/colors"
import { BORDERRADIUS, FontFamily } from "./src/config/style/styles"

module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/common/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: COLORS,
			borderRadius: BORDERRADIUS,
			fontFamily: FontFamily,
		},
	},
	plugins: [require("tailwindcss-animate")],
}
