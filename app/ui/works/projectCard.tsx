import Link from "next/link";
import TechStack from "./techStack";
import { Project } from "./projectList";

export default function ProjectCard({
	title,
	techStack,
	slug,
}: Omit<Project, "_id">) {
	return (
		<Link
			href={`/works/${slug}`}
			className='group w-full min-h-48 bg-white border border-lavender border-solid flex gap-6 flex-col items-center justify-center p-8 hover:shadow-black hover:shadow-selected hover:bg-lavender hover:cursor-pointer duration-500'
		>
			<h2 className='text-xl font-bold text-center text-lavender px-6 group-hover:text-white'>
				{title}
			</h2>
			<TechStack
				techStack={techStack}
				limit={5}
				iconOnly
				className={
					"flex flex-wrap gap-3 text-lg max-w-full px-3 group-hover:text-white"
				}
			/>
		</Link>
	);
}
