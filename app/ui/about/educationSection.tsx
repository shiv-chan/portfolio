import { formatUSDate } from "@/app/lib/utils";

export default function EducationSection({ education }: { education: any[] }) {
	return (
		<div>
			<h2 className='mb-4 text-xl uppercase font-bold'>Education</h2>
			{education.map(ele => {
				const { school, startDate, endDate, degree } = ele.fields;
				// time format
				const start = formatUSDate(startDate);
				const end = formatUSDate(endDate);

				return (
					<div key={ele.sys.id} className='mb-9'>
						<div>
							<h3 className='flex items-center font-bold w-fit'>{school}</h3>
							<p className='font-light text-sm'>
								{start} - {end}
							</p>
						</div>
						<p className='font-light text-sm'>{degree}</p>
					</div>
				);
			})}
		</div>
	);
}
