import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				lavender: {
					DEFAULT: "#87288F",
					light: "#E1C9E3",
				},
			},
			dropShadow: {
				selected: "4px 4px 0 rgba(0, 0, 0, 1)",
			},
			boxShadow: {
				selected: "4px 4px 0 0 rgba(0, 0, 0, 1)",
			},
		},
	},
	plugins: [],
};
export default config;
