import { formatDate } from "@/app/lib/utils";
import { getCurrentLocale } from "@/locales/server";

interface Education {
	_id: string;
	school: string;
	degree: string;
	startDate: string;
	endDate: string;
}

export default async function EducationSection({
	educations,
}: {
	educations: Education[];
}) {
	const locale = await getCurrentLocale();

	return (
		<div>
			<h2 className='mb-4 text-xl uppercase font-bold'>Education</h2>
			{educations.map(education => {
				const { _id, school, degree, startDate, endDate } = education;
				// time format
				const start = formatDate(startDate, locale);
				const end = formatDate(endDate, locale);

				return (
					<div key={_id} className='mb-9'>
						<h3 className='flex items-center font-bold w-fit'>{school}</h3>
						<p className='font-light text-sm'>
							{start} - {end}
						</p>
						<p className='font-light text-sm'>{degree}</p>
					</div>
				);
			})}
		</div>
	);
}
