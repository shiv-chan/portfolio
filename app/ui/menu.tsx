"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SocialMedia from "./socialMedia";
import LanguageToggle from "@/app/ui/languageToggle";
import { useState, useEffect } from "react";
import { useNavigationContext } from "@/app/lib/context/navigationContext";
import Footer from "@/app/ui/footer";

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
	const highlightMenu = (menu: string): boolean =>
		pathname.split("/").includes(menu);
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
						"text-white bg-lavender drop-shadow-selected": highlightMenu(menu),
					},
					"hover:text-white hover:bg-lavender hover:drop-shadow-selected w-fit",
					{ [animation]: isAnimating && !previousRoute },
					`${
						(pathname !== "/" && pathname !== "/jp") ||
						isMenuVisible[index] ||
						previousRoute
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
		if (pathname === "/" || pathname === "/jp") {
			setIsAnimating(true);
		}
	}, [pathname]);

	return (
		<div className='text-lavender md:h-dvh md:col-start-1 2xl:col-start-2 2xl:col-end-3 2xl:pt-8'>
			<div
				className={`${
					(pathname !== "/" && pathname !== "/jp") ||
					previousRoute ||
					isAnimating
						? "hidden"
						: "block"
				} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-loadingBounce`}
			>
				Loading...
			</div>
			<div className='md:fixed md:w-min min-[2300px]:w-auto'>
				<LanguageToggle />
				<Link
					href='/'
					className='m-8 mt-4 inline-block'
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<h1
						className={clsx(
							"text-3xl font-bold uppercase",
							`${
								(pathname !== "/" && pathname !== "/jp") ||
								isTitleVisible ||
								previousRoute
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
								(pathname !== "/" && pathname !== "/jp") ||
								isTitleVisible ||
								previousRoute
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
				<ul className='uppercase font-bold ml-8 pb-16 flex flex-col gap-2.5 text-xl'>
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
			<Footer className="hidden md:block" />
			</div>
		</div>
	);
}
