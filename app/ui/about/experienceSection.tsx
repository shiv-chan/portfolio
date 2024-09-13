"use client";

import { formatUSDate, worksOptions } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

export default function ExperienceSection({
	experience,
}: {
	experience: any[];
}) {
	return (
		<div>
			<h2 className='mb-4 text-xl uppercase font-bold'>Work Experience</h2>
			{experience.map((ele, index) => {
				return (
					<div key={ele.sys.id} className='mb-9'>
						<Experience opened={index == 0} content={ele} />
					</div>
				);
			})}
		</div>
	);
}

export function Experience({
	opened,
	content,
}: {
	opened: boolean;
	content: any;
}) {
	const { title, company, startDate, endDate, description } = content.fields;

	// time format
	const start = formatUSDate(startDate);
	const end = formatUSDate(endDate);

	const [showDetails, setShowDetails] = useState<boolean>(opened);
	const toggleShowDetails = () => setShowDetails(prev => !prev);

	return (
		<>
			<div className='mb-2'>
				<h3
					className='flex flex-wrap gap-x-2 items-center font-bold w-fit hover:cursor-pointer'
					onClick={toggleShowDetails}
				>
					{showDetails && <FaChevronDown className='text-sm' />}
					{!showDetails && <FaChevronRight className='text-sm' />}
					{title} <span className='font-normal'> - {company}</span>
				</h3>
				<p className='font-light text-sm ml-6'>
					{start} - {end}
				</p>
			</div>
			<div className={showDetails ? "block" : "hidden"}>
				{renderRichText(description as Document, worksOptions)}
			</div>
		</>
	);
}
