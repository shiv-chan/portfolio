import ProjectCard from "./projectCard";

export interface Project {
	_id: string;
	title: string;
	techStack: string[];
	slug: string;
}

export default function ProjectList({ projects }: { projects: Project[] }) {
	return projects.map(project => {
		const { _id, title, techStack, slug } = project;
		return (
			<ProjectCard key={_id} title={title} techStack={techStack} slug={slug} />
		);
	});
}
