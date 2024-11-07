"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SocialMedia from "./socialMedia";

export default function Menu() {
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
		<div className='text-lavender md:h-dvh md:col-start-1 2xl:col-start-2 2xl:col-end-3 2xl:relative 2xl:pt-8'>
			<div className='md:fixed md:w-min min-[2300px]:w-auto'>
				<Link
					href='/'
					className='m-8 inline-block'
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<h1 className='text-3xl font-bold uppercase'>Kaho Shibuya</h1>
					<p className='text-base font-thin'>Software Developer</p>
				</Link>
				<ul className='uppercase font-bold ml-8 pb-8 flex flex-col gap-2.5 text-xl'>
					{menuList}
				</ul>
				<Image
					src='/logo.png'
					width={192}
					height={192}
					alt='logo'
					priority={true}
					className='fixed -bottom-[40px] -left-[80px] -z-10 2xl:absolute 2xl:top-0 2xl:left-0'
				/>
			</div>
			<SocialMedia />
		</div>
	);
}
