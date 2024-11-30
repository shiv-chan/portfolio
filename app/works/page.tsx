import { getWorks } from "@/app/lib/data";
import ProjectList from "@/app/ui/works/projectList";

export default async function Page() {
	const projects = await getWorks();

	return (
		<div className='mx-8 pb-20 max-w-4xl text-base leading-relaxed grid grid-flow-dense grid-cols-1 gap-4 align-items-center sm:grid-cols-2 xl:grid-cols-3 2xl:pt-8'>
			<ProjectList projects={projects} />
		</div>
	);
}
