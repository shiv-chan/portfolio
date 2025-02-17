import React from "react";

import { IconType } from "react-icons";
import {
	SiHtml5,
	SiCss3,
	SiJavascript,
	SiSquarespace,
	SiReact,
	SiRedux,
	SiYoutube,
	SiStyledcomponents,
	SiMaterialdesign,
	SiSass,
	SiNextdotjs,
	SiTypescript,
	SiZod,
	SiTailwindcss,
	SiPostgresql,
	SiVercel,
	SiNuxtdotjs,
	SiFigma,
	SiContentful,
	SiGraphql,
	SiAmazonwebservices,
	SiJenkins
} from "react-icons/si";
import { FaGears } from "react-icons/fa6";

import clsx from "clsx";

interface TechStackProps extends React.HTMLAttributes<HTMLDivElement> {
	techStack: string[];
	limit?: number;
	iconOnly?: boolean;
}

const techStackIcons: Record<string, IconType> = {
	html: SiHtml5,
	css: SiCss3,
	javascript: SiJavascript,
	squarespace: SiSquarespace,
	react: SiReact,
	redux: SiRedux,
	"iframe player api": SiYoutube,
	"styled components": SiStyledcomponents,
	"material ui": SiMaterialdesign,
	sass: SiSass,
	next: SiNextdotjs,
	typescript: SiTypescript,
	zod: SiZod,
	"tailwind css": SiTailwindcss,
	postgresql: SiPostgresql,
	vercel: SiVercel,
	nuxt: SiNuxtdotjs,
	figma: SiFigma,
	contentful: SiContentful,
	graphql: SiGraphql,
	"amazon s3": SiAmazonwebservices,
	jenkins: SiJenkins
};

export default function TechStack({
	techStack,
	limit,
	iconOnly = false,
	className,
}: TechStackProps) {
	return (
		<div className={clsx(["text-lavender", className])}>
			{techStack.length &&
				techStack.map((t, index) => {
					const icon = React.createElement(
						techStackIcons[t.toLocaleLowerCase().trim()] || FaGears,
						{ title: t, key: index }
					);
					const iconWithText = (
						<div className='flex items-center gap-2' key={index}>
							{icon}
							<p>{t}</p>
						</div>
					);

					if (iconOnly) {
						if (limit && index < limit) {
							return icon;
						}
						if (!limit) {
							return icon;
						}
					} else {
						if (limit && index < limit) {
							return iconWithText;
						}
						if (!limit) {
							return iconWithText;
						}
					}
				})}
		</div>
	);
}
