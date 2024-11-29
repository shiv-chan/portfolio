import { getEntries, getSummary } from "@/app/lib/data";
import { options, reverseChronologicalSort } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import ExperienceSection from "../ui/about/experienceSection";
import EducationSection from "../ui/about/educationSection";

export default async function Page() {
	const summary = await getSummary();
	const skills = await getEntries("skills");
	const skillsArr = skills![0].fields.skills as string[];
	const experience = await getEntries("experience");
	const sortedExperience = reverseChronologicalSort(experience!, "endDate");
	const education = await getEntries("education");
	const sortedEducation = reverseChronologicalSort(education!, "endDate");

	return (
		<div className='grid gap-9 mx-8 pb-20 text-lavender leading-relaxed 2xl:pt-8'>
			{summary && <div>{renderRichText(summary, options)}</div>}
			{skills && (
				<div>
					<h2 className='mb-4 text-xl uppercase font-bold'>Skills</h2>
					<ul className='font-light list-disc ml-4'>
						{skillsArr.map(skill => (
							<li className='mb-1' key={skill}>
								{skill}
							</li>
						))}
					</ul>
				</div>
			)}
			{sortedExperience.length && (
				<ExperienceSection experience={sortedExperience} />
			)}
			{sortedEducation.length && (
				<EducationSection education={sortedEducation} />
			)}
		</div>
	);
}
