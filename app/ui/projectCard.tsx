import Link from "next/link";
import TechStack from "./techStack";

export interface ProjectCardProps {
	title: string;
	techStack: string[];
	slug: string;
	id: string;
}

export default function ProjectCard({
	title,
	techStack,
	slug,
	id,
}: ProjectCardProps) {
	return (
		<Link
			href={`/works/${slug}/${id}`}
			className='group w-full min-h-48 bg-white border border-lavender border-solid flex gap-6 flex-col items-center justify-center p-8 hover:shadow-black hover:shadow-selected hover:bg-lavender-light hover:cursor-pointer duration-100'
		>
			<h2 className='text-xl font-bold text-center text-lavender px-6'>
				{title}
			</h2>
			<TechStack
				techStack={techStack}
				limit={5}
				iconOnly
				className={"flex flex-wrap gap-3 text-xl max-w-full px-3"}
			/>
		</Link>
	);
}
