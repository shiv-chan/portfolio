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
			keyframes: {
				rise: {
					"0%": {
						transform: "translateY(20px)",
						opacity: "0%",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
				loadingBounce: {
					"0%": {
						transform: "translate(-50%, -25%)",
						"animation-timing-function": "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "translate(-50%, -50%)",
						"animation-timing-function": "cubic-bezier(0,0,0.2,1)",
					},
					"100%": {
						transform: "translate(-50%, -25%)",
						"animation-timing-function": "cubic-bezier(0.8,0,1,1)",
					},
				},
			},
			animation: {
				rise: "rise 1s ease-in-out",
				riseDelay500: "rise 1s ease-in-out 500ms",
				riseDelay1000: "rise 1s ease-in-out 1000ms",
				riseDelay1500: "rise 1s ease-in-out 1500ms",
				riseDelay2000: "rise 1s ease-in-out 2000ms",
				loadingBounce: "loadingBounce 1s infinite",
			},
		},
	},
	plugins: [],
};
export default config;
