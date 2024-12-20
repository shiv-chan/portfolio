import {
	getSummary,
	getSkills,
	getExperiences,
	getEducations,
} from "@/app/lib/data";
import { options, locales } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import ExperienceSection from "@/app/ui/about/experienceSection";
import EducationSection from "@/app/ui/about/educationSection";
import { getCurrentLocale } from "@/locales/server";

export default async function Page() {
	const locale = await getCurrentLocale();
	const summary: Document = await getSummary(locales[locale]);
	const skills: string[] = await getSkills();
	const experiences = await getExperiences(locales[locale]);
	const educations = await getEducations(locales[locale]);

	return (
		<div className='grid gap-9 mx-8 pb-20 text-lavender leading-relaxed max-w-4xl 2xl:pt-8'>
			{summary && <div>{renderRichText(summary, options)}</div>}
			{skills && (
				<div>
					<h2 className='mb-4 text-xl uppercase font-bold'>Skills</h2>
					<ul className='font-light list-disc ml-4'>
						{skills.map(skill => (
							<li className='mb-1' key={skill}>
								{skill}
							</li>
						))}
					</ul>
				</div>
			)}
			{experiences.length && <ExperienceSection experiences={experiences} />}
			{educations.length && <EducationSection educations={educations} />}
		</div>
	);
}
