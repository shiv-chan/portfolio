import { Entry, EntrySkeletonType } from "contentful";
import ProjectCard, { ProjectCardProps } from "./projectCard";

export default function ProjectList({
	projects,
}: {
	projects: Entry<EntrySkeletonType, undefined, string>[] | undefined;
}) {
	return (
		projects &&
		projects.map(d => {
			if (d.hasOwnProperty("fields") && d.hasOwnProperty("sys")) {
				const { title, techStack, slug } = d.fields as unknown as Omit<
					ProjectCardProps,
					"id"
				>;
				const { id } = d.sys as { [key: string]: any };
				return (
					<ProjectCard
						key={d.sys.id}
						title={title}
						techStack={techStack}
						slug={slug}
						id={id}
					/>
				);
			}
		})
	);
}
