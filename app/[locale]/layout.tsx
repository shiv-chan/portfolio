import type { Metadata } from "next";
import "@/app/ui/global.css";
import { mulish } from "@/app/ui/fonts";
import Menu from "@/app/ui/menu";
import ScrollTop from "@/app/ui/scrollTop";
import { OpenToWorkBanner } from "@/app/ui/banner";
import clsx from "clsx";
import { NavigationProvider } from "@/app/lib/context/navigationContext";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "Kaho Shibuya - Software Developer",
	description: "Kaho Shibuya's portfolio website",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		title: "Kaho Shibuya - Software Developer",
		description: "Kaho Shibuya's portfolio website",
		url: "https://kahoshibuya.dev/",
		siteName: "Kaho Shibuya - Software Developer",
		images: [
			{
				url: "https://kahoshibuya.dev/_next/image?url=%2Fopengraph.png&w=3840&q=75", // Must be an absolute URL
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getCurrentLocale();
	return (
		<html lang='en' className={clsx(mulish.className, "overscroll-y-none")}>
			<body
				className='grid min-w-80 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 overscroll-contain'
				suppressHydrationWarning={true}
			>
				<I18nProviderClient locale={locale}>
					<NavigationProvider>
						<OpenToWorkBanner />
						<Menu />
						<div className='relative md:mt-8 md:col-span-2 xl:col-start-2 xl:col-end-5 2xl:col-start-3 2xl:col-end-7'>
							{children}
						</div>
						<ScrollTop />
					</NavigationProvider>
				</I18nProviderClient>
				<SpeedInsights />
			</body>
		</html>
	);
}
