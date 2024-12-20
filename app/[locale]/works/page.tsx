import { getWorks } from "@/app/lib/data";
import ProjectList from "@/app/ui/works/projectList";
import { locales } from "@/app/lib/utils";
import { getCurrentLocale } from "@/locales/server";

export default async function Page() {
	const locale = await getCurrentLocale();
	const projects = await getWorks(locales[locale]);

	return (
		<div className='mx-8 pb-20 max-w-4xl text-base leading-relaxed grid grid-cols-1 gap-4 align-items-center auto-rows-fr sm:grid-cols-2 xl:grid-cols-3 2xl:pt-8'>
			<ProjectList projects={projects} />
		</div>
	);
}
