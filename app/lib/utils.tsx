import { getAsset } from "./data";
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
		placeholder={`data:image/svg+xml;base64,${toBase64(
			shimmer(width, height)
		)}`}
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
		[BLOCKS.EMBEDDED_ASSET]: async (node: Node, children: React.ReactNode) => {
			const { id } = node.data.target.sys;
			const { title, url, width, height } = await getAsset(id);
			return (
				<EmbeddedAsset src={url} width={width} height={height} alt={title} />
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

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E1C9E3" offset="20%" />
      <stop stop-color="#F5E9F8" offset="50%" />
      <stop stop-color="#E1C9E3" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E1C9E3" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);

export const locales = {
	en: "en-US",
	jp: "ja",
};
