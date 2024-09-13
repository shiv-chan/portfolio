import { INLINES, MARKS, BLOCKS, Node } from "@contentful/rich-text-types";
import Image from "next/image";

const Paragraph = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<p className='mb-2 font-light font-base leading-relaxed'>{children}</p>
);
const OrderedList = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<ol className='list-decimal font-light ml-4 font-base'>{children}</ol>
);
const UnorderedList = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => (
	<ul className='list-disc font-light ml-4 font-base'>{children}</ul>
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

export const worksOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
			<Paragraph>{children}</Paragraph>
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
					src={`https://${url}`}
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
		  }).format(new Date(date))
		: "Current";
};
