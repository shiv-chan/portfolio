import { getEntries } from "../lib/data";
import ProjectList from "../ui/projectList";

export default async function Page() {
	const document = await getEntries("works");

	return (
		<div className='mx-8 pb-20 max-w-4xl text-base leading-relaxed grid grid-flow-dense grid-cols-1 gap-4 align-items-center sm:grid-cols-2 xl:grid-cols-3 2xl:pt-8'>
			<ProjectList projects={document} />
		</div>
	);
}
