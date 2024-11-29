import { formatUSDate } from "@/app/lib/utils";

interface Education {
	_id: string;
	school: string;
	degree: string;
	startDate: string;
	endDate: string;
}

export default function EducationSection({
	educations,
}: {
	educations: Education[];
}) {
	return (
		<div>
			<h2 className='mb-4 text-xl uppercase font-bold'>Education</h2>
			{educations.map(education => {
				const { _id, school, degree, startDate, endDate } = education;
				// time format
				const start = formatUSDate(startDate);
				const end = formatUSDate(endDate);

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
