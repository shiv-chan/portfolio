import type { Metadata } from "next";
import "@/app/ui/global.css";
import { mulish } from "./ui/fonts";
import Menu from "./ui/menu";
import SocialMedia from "./ui/socialMedia";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Kaho Shibuya - Software Developer",
	description: "Kaho Shibuya's portfolio website",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
	},
	// openGraph: {
	// 	title: "Kaho Shibuya - Software Developer",
	// 	description: "Kaho Shibuya's portfolio website",
	// 	url: "",
	// 	siteName: "Kaho Shibuya - Software Developer",
	// 	images: [
	// 		{
	// 			url: "", // Must be an absolute URL
	// 			width: 1200,
	// 			height: 630,
	// 		},
	// 	],
	// 	locale: "en_US",
	// 	type: "website",
	// },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={mulish.className}>
			<body>
				<Menu openToWork />
				{children}
				<Image
					src='/logo.png'
					width={192}
					height={192}
					alt='logo'
					className='fixed -bottom-10 -left-20 -z-10'
				/>
				<SocialMedia />
			</body>
		</html>
	);
}
