"use client";

interface MenuProps {
	openToWork?: boolean;
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Menu({ openToWork }: MenuProps) {
	const menuItems: string[] = ["works", "about", "contact"];
	const pathname: string | null = usePathname();
	const currentPage: string | null = pathname.split("/")[1];
	const menuList = menuItems.map(item => {
		return (
			<li
				key={item}
				className={clsx([
					currentPage == `${item}` &&
						"text-white bg-lavender drop-shadow-selected",
					"hover:text-white hover:bg-lavender hover:drop-shadow-selected w-fit",
				])}
			>
				<Link href={`/${item}`}>{item}</Link>
			</li>
		);
	});

	return (
		<div className='text-lavender'>
			{openToWork && currentPage == "" && <OpenToWorkBanner />}
			<Link href='/' className='m-8 inline-block'>
				<h1 className='text-3xl font-bold uppercase'>Kaho Shibuya</h1>
				<p className='text-base font-thin'>Software Developer</p>
			</Link>
			<ul className='uppercase font-bold ml-8 pb-8 flex flex-col gap-2.5 text-xl'>
				{menuList}
			</ul>
		</div>
	);
}

export function OpenToWorkBanner() {
	return (
		<div className='bg-lavender text-white uppercase font-bold text-sm text-center py-1.5'>
			I am open to work!{" "}
			<Link href='/contact' className='underline'>
				Contact
			</Link>
		</div>
	);
}
