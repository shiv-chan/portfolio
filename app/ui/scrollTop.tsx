"use client";

import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { FaCircleArrowUp } from "react-icons/fa6";

export default function ScrollTop() {
	const [scrollY, setScrollY] = useState<number>(0);

	useEffect(() => {
		const handleScroll = throttle(() => {
			setScrollY(window.scrollY);
		}, 100);

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			handleScroll.cancel();
		};
	}, []);

	return (
		<div className='fixed bottom-0 right-0 m-8 text-3xl text-lavender z-10'>
			{scrollY > 130 && (
				<FaCircleArrowUp
					className='hover:cursor-pointer'
					onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
				/>
			)}
		</div>
	);
}
