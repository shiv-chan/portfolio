"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SocialMedia from "./socialMedia";
import { useState, useEffect } from "react";
import { useNavigationContext } from "@/app/lib/context/navigationContext";

export default function Menu() {
	const { previousRoute } = useNavigationContext();

	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false);
	const [isMenuVisible, setIsMenuVisible] = useState<boolean[]>([
		false,
		false,
		false,
	]);

	const menuItems: { menu: string; animation: string }[] = [
		{ menu: "works", animation: "animate-riseDelay500" },
		{ menu: "about", animation: "animate-riseDelay1000" },
		{ menu: "contact", animation: "animate-riseDelay1500" },
	];
	const pathname: string | null = usePathname();
	const currentPage: string | null = pathname.split("/")[1];
	const menuList = menuItems.map((item, index) => {
		const { menu, animation } = item;
		const handleOnAnimationStart = () => {
			setIsMenuVisible(prev => {
				prev[index] = true;
				return [...prev];
			});
		};

		return (
			<li
				key={menu}
				className={clsx([
					{
						"text-white bg-lavender drop-shadow-selected":
							currentPage == `${menu}`,
					},
					"hover:text-white hover:bg-lavender hover:drop-shadow-selected w-fit",
					{ [animation]: isAnimating && !previousRoute },
					`${
						pathname !== "/" || isMenuVisible[index] || previousRoute
							? "visible"
							: "invisible"
					}`,
				])}
				onAnimationStart={handleOnAnimationStart}
			>
				<Link href={`/${menu}`}>{menu}</Link>
			</li>
		);
	});

	useEffect(() => {
		if (pathname === "/") {
			setIsAnimating(true);
		}
	}, [pathname]);

	return (
		<div className='text-lavender md:h-dvh md:col-start-1 2xl:col-start-2 2xl:col-end-3 2xl:relative 2xl:pt-8'>
			<div
				className={`${
					pathname !== "/" || previousRoute || isAnimating ? "hidden" : "block"
				} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-loadingBounce`}
			>
				Loading...
			</div>
			<div className='md:fixed md:w-min min-[2300px]:w-auto'>
				<Link
					href='/'
					className='m-8 inline-block'
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<h1
						className={clsx(
							"text-3xl font-bold uppercase",
							`${
								pathname !== "/" || isTitleVisible || previousRoute
									? "visible"
									: "invisible"
							}`,
							{
								"animate-rise": isAnimating && !previousRoute,
							}
						)}
					>
						Kaho Shibuya
					</h1>
					<p
						className={clsx(
							"text-base font-thin",
							`${
								pathname !== "/" || isTitleVisible || previousRoute
									? "visible"
									: "invisible"
							}`,
							{
								"animate-riseDelay500": isAnimating && !previousRoute,
							}
						)}
						onAnimationStart={() => {
							setIsTitleVisible(true);
						}}
					>
						Software Developer
					</p>
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
