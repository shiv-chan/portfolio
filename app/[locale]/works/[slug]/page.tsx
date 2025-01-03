import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./work.module.css";
import { getWork } from "@/app/lib/data";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { worksOptions, shimmer, toBase64, locales } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { IoCloseOutline, IoCodeSlash, IoOpenOutline } from "react-icons/io5";
import TechStack from "@/app/ui/works/techStack";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";

interface Work {
	previewUrl: string;
	sourceUrl: string;
	title: string;
	thumbnail: {
		title: string;
		url: string;
		width: number;
		height: number;
	};
	techStack: string[];
	roles: string[];
	about: { json: Document };
	notes: { json: Document };
}

export default async function Page({ params }: { params: { slug: string } }) {
	const t = await getScopedI18n("work");
	const { slug } = params;
	const locale = await getCurrentLocale();
	const work: Work = await getWork(slug, locales[locale]);
	const {
		previewUrl,
		sourceUrl,
		title,
		thumbnail,
		techStack,
		roles,
		about,
		notes,
	} = work;
	return (
		<div className='mx-8 pb-20 text-lavender max-w-4xl'>
			<main className='grid grid-cols-1 gap-y-9'>
				<div>
					<div className='flex items-center mb-4 gap-4'>
						<h1 className='text-xl uppercase font-bold whitespace-nowrap'>
							{title}
						</h1>
						<Link href='/works' className='ml-auto' aria-label='works'>
							<IoCloseOutline className='text-2xl' />
						</Link>
					</div>
					{thumbnail && (
						<Image
							src={thumbnail.url}
							alt={thumbnail.title}
							width={thumbnail.width}
							height={thumbnail.height}
							className='w-full max-w-xl'
							placeholder={`data:image/svg+xml;base64,${toBase64(
								shimmer(thumbnail.width, thumbnail.height)
							)}`}
						/>
					)}
					<div className='mt-2 flex flex-col gap-2'>
						{previewUrl && (
							<a
								href={previewUrl}
								target='_blank'
								className='flex gap-1 items-center w-fit underline'
								aria-label='live preview'
							>
								<IoOpenOutline />
								{t("livePreview")}
							</a>
						)}
						{sourceUrl && (
							<a
								href={sourceUrl}
								target='_blank'
								className='flex gap-1 items-center w-fit underline'
								aria-label='view source code'
							>
								<IoCodeSlash />
								{t("sourceCode")}
							</a>
						)}
					</div>
				</div>
				<div>
					<h2 className='text-xl uppercase font-bold mb-4'>Tech Stack</h2>
					<TechStack
						techStack={techStack}
						className={"flex flex-col flex-wrap text-lg font-light gap-3"}
					/>
				</div>
				<div>
					<h2 className='text-xl uppercase font-bold mb-4'>Roles</h2>
					<ul className='list-disc ml-4 text-lg font-light'>
						{roles &&
							roles.map(r => (
								<li key={r} className='mb-1'>
									{r}
								</li>
							))}
					</ul>
				</div>
				{about && (
					<div className={styles.about}>
						<h2 className='text-xl uppercase font-bold mb-4'>About</h2>
						{renderRichText(about.json, worksOptions)}
					</div>
				)}
				{notes && (
					<div className={styles.notes}>
						<h2 className='text-xl uppercase font-bold mb-4'>Notes</h2>
						{renderRichText(notes.json, worksOptions)}
					</div>
				)}
			</main>
		</div>
	);
}
