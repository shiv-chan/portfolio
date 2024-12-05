import {
	getSummary,
	getSkills,
	getExperiences,
	getEducations,
} from "@/app/lib/data";
import { options } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import ExperienceSection from "../ui/about/experienceSection";
import EducationSection from "../ui/about/educationSection";

export default async function Page() {
	const summary: Document = await getSummary();
	const skills: string[] = await getSkills();
	const experiences = await getExperiences();
	const educations = await getEducations();

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
