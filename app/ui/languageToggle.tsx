"use client";

import dynamic from "next/dynamic";
import "react-flagpack/dist/style.css";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

const Flag = dynamic(() => import("react-flagpack"), { ssr: false });

export default function LanguageToggle() {
	const changeLocale = useChangeLocale();
	const locale = useCurrentLocale();
	return (
		<div className='ml-8 mt-4 flex gap-2 w-fit'>
			<div
				className={`flex items-center gap-1 cursor-pointer ${
					locale == "en" ? "hidden" : "block"
				}`}
				onClick={() => changeLocale("en")}
				title='English'
			>
				<Flag code='CA' size='m' hasBorderRadius hasBorder={false} />
				<span className='text-xs underline'>Go to English site</span>
			</div>
			<div
				className={`flex items-center gap-1 cursor-pointer ${
					locale == "jp" ? "hidden" : "block"
				}`}
				onClick={() => changeLocale("jp")}
				title='Japanese'
			>
				<Flag code='JP' size='m' hasBorderRadius />
				<span className='text-xs underline'>日本語サイトへ</span>
			</div>
		</div>
	);
}
