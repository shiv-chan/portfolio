import { INLINES, MARKS, BLOCKS, Node } from "@contentful/rich-text-types";
import Image from "next/image";

const Paragraph = ({
	children,
	mb = 2,
}: Readonly<{ children: React.ReactNode; mb?: number }>) => (
	<p className={`mb-${mb} font-light font-base leading-relaxed`}>{children}</p>
);
const H5 = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<h5 className='text-lg font-bold font-base leading-relaxed mb-2'>
		{children}
	</h5>
);
const OrderedList = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<ol className='list-decimal font-light ml-4 my-8 font-base'>{children}</ol>
);
const UnorderedList = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => (
	<ul className='list-disc font-light ml-4 my-8 font-base'>{children}</ul>
);
const HyperLink = ({
	children,
	link,
}: Readonly<{ children: React.ReactNode; link: string }>) => (
	<a
		href={link}
		target='_blank'
		className='underline font-bold text-lavender font-base'
	>
		{children}
	</a>
);
const Code = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<code className='font-mono font-light text-xs bg-gray-200 px-1.5 py-1 rounded'>
		{children}
	</code>
);
const EmbeddedAsset = ({
	src,
	width,
	height,
	alt,
}: Readonly<{
	src: string;
	width: number;
	height: number;
	alt: string;
}>) => (
	<Image
		src={src}
		width={width}
		height={height}
		alt={alt}
		className='w-full max-w-xl my-8'
	/>
);

export const options = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
			<Paragraph>{children}</Paragraph>
		),
		[BLOCKS.HEADING_5]: (node: Node, children: React.ReactNode) => (
			<H5>{children}</H5>
		),
		[BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => (
			<OrderedList>{children}</OrderedList>
		),
		[BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
			<UnorderedList>{children}</UnorderedList>
		),
		[BLOCKS.EMBEDDED_ASSET]: (node: Node, children: React.ReactNode) => {
			const { title, file } = node.data.target.fields;
			const { url, details } = file;
			return (
				<EmbeddedAsset
					src={`https:${url}`}
					width={details.image.width}
					height={details.image.height}
					alt={title}
				/>
			);
		},
		[INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
			<HyperLink link={node.data.uri}>{children}</HyperLink>
		),
	},
	renderMark: {
		[MARKS.CODE]: (text: React.ReactNode) => <Code>{text}</Code>,
	},
	preserveWhitespace: true,
};

export const worksOptions = {
	...options,
	renderNode: {
		...options.renderNode,
		[BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
			<Paragraph mb={4}>{children}</Paragraph>
		),
	},
};

export const reverseChronologicalSort = (
	content: any[],
	sortBy: "startDate" | "endDate"
): any[] => {
	return content.sort((a, b) => {
		if (a.fields[sortBy] == undefined || b.fields[sortBy] == undefined)
			return 1;
		return (
			Date.parse(b.fields[sortBy] as string) -
			Date.parse(a.fields[sortBy] as string)
		);
	});
};

export const formatUSDate = (date: string): string => {
	return date
		? new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				timeZone: "UTC",
		  }).format(new Date(date))
		: "Current";
};
