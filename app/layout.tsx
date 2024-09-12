import type { Metadata } from "next";
import "@/app/ui/global.css";
import { mulish } from "./ui/fonts";
import Menu from "./ui/menu";
import SocialMedia from "./ui/socialMedia";
import { OpenToWorkBanner } from "./ui/banner";
import Image from "next/image";
import clsx from "clsx";

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
			<body className='grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'>
				<OpenToWorkBanner />
				<Menu />
				<div className='md:mt-8 md:col-span-2 xl:col-start-2 xl:col-end-5 2xl:col-start-3 2xl:col-end-7'>
					{children}
				</div>
			</body>
		</html>
	);
}
