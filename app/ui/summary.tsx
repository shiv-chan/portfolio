"use client";

import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { options } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { useState, useEffect } from "react";
import { useNavigationContext } from "@/app/lib/context/navigationContext";

export default function Summary({
	summary,
}: {
	summary: Document | undefined;
}) {
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { previousRoute } = useNavigationContext();

	useEffect(() => {
		setIsAnimating(true);
	}, []);

	return (
		<div
			className={`mx-8 pb-20 2xl:pt-8 text-lavender ${
				previousRoute == null &&
				isAnimating &&
				"animate-riseDelay2000 md:animate-riseDelay500"
			}  ${isVisible || previousRoute ? "visible" : "invisible"}`}
			onAnimationStart={() => {
				setIsVisible(true);
			}}
		>
			{summary && renderRichText(summary, options)}
		</div>
	);
}
