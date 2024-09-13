import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getEntry } from "@/app/lib/data";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { worksOptions } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { IoCloseOutline } from "react-icons/io5";
import TechStack from "@/app/ui/works/techStack";
import { FaGlobe, FaGithub } from "react-icons/fa6";

interface DocumentFields {
	previewUrl: string;
	sourceUrl: string;
	title: string;
	thumbnail: { [key: string]: any };
	techStack: string[];
	roles: string[];
	about: { [key: string]: any };
	notes: { [key: string]: any };
	slug: string;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
	const [_, id] = params.slug;
	const document = await getEntry(id);
	const {
		previewUrl,
		sourceUrl,
		title,
		thumbnail,
		techStack,
		roles,
		about,
		notes,
		slug,
	}: DocumentFields = document.fields as unknown as DocumentFields;
	return (
		<div className='mx-8 pb-20 text-lavender'>
			{document && (
				<main className='grid grid-cols-1 gap-y-9'>
					<div>
						<div className='flex items-center mb-4 gap-4'>
							{React.createElement(
								"h1",
								{ className: "text-xl uppercase font-bold" },
								`${title}`
							)}
							<div className='flex gap-2 text-xl'>
								{previewUrl && (
									<a href={previewUrl} target='_blank'>
										<FaGlobe />
									</a>
								)}
								{sourceUrl && (
									<a href={sourceUrl} target='_blank'>
										<FaGithub />
									</a>
								)}
							</div>
							<Link href='/works' className='ml-auto'>
								<IoCloseOutline className='text-2xl' />
							</Link>
						</div>
						{thumbnail && thumbnail.hasOwnProperty("fields") && (
							<Image
								/* @ts-ignore */
								src={`https:${thumbnail.fields.file.url}`}
								/* @ts-ignore */
								alt={thumbnail.fields.title}
								/* @ts-ignore */
								width={thumbnail.fields.file.details.image.width}
								/* @ts-ignore */
								height={thumbnail.fields.file.details.image.height}
								className='w-full max-w-xl'
							/>
						)}
					</div>
					<div>
						<h2 className='text-xl uppercase font-bold mb-4'>Tech Stack</h2>
						<TechStack
							techStack={techStack as string[]}
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
						<div>
							<h2 className='text-xl uppercase font-bold mb-4'>About</h2>
							{renderRichText(about as Document, worksOptions)}
						</div>
					)}
					{notes && (
						<div>
							<h2 className='text-xl uppercase font-bold mb-4'>Notes</h2>
							{renderRichText(notes as Document, worksOptions)}
						</div>
					)}
				</main>
			)}
		</div>
	);
}
