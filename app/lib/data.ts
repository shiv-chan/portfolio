import { createClient } from "contentful";
import { notFound } from "next/navigation";

const client = createClient({
	space: process.env.CF_SPACE_ID as string,
	accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN as string,
});

export async function getEntries(contentType: string) {
	try {
		const entries = await client.getEntries({ content_type: contentType });
		if (entries.items.length) return entries.items;
	} catch (error) {
		notFound();
		throw new Error(`Failed to get entries: ${error}`);
	}
}

export async function getEntry(id: string) {
	try {
		const entry = await client.getEntry(id);
		return entry;
	} catch (error) {
		throw new Error(`Failed to get entry: ${error}`);
	}
}

const { CF_SPACE_ID, CF_DELIVERY_ACCESS_TOKEN } = process.env as {
	[key: string]: string;
};

async function fetchGraphQL(query: string) {
	const baseURL = "https://graphql.contentful.com/content/v1/spaces/";

	try {
		const response = await fetch(`${baseURL}${CF_SPACE_ID}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${CF_DELIVERY_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
			next: { tags: ["contents"] },
		});
		const json = await response.json();
		// console.log(contents);

		if (!response.ok) {
			throw new Error(
				`${
					json?.message ||
					json.errors.map((ele: any) => ele.message).join("\n") ||
					"Something went wrong!"
				}`
			);
		}
		return json;
	} catch (error) {
		throw new Error(`Failed to fetch GraphQL: ${error}`);
	}
}

export async function getSummary() {
	const query = `
		query {
  			summaryCollection(limit:1){
    			items {
      				summary {
        				json
      				}
    			}
  			}
		}`;
	const response = await fetchGraphQL(query);
	return response.data.summaryCollection.items[0].summary.json;
}

export async function getSkills() {
	const query = `
		query {
  			skillsCollection(limit: 1) {
    			items {
      				skills
    			}
  			}
		}`;
	const response = await fetchGraphQL(query);
	return response.data.skillsCollection.items[0].skills;
}

export async function getExperiences(limit: number = 3) {
	const query = `
		query {
			experienceCollection(order: endDate_DESC, limit: ${limit}) {
				items {
					_id
					title
					company
					startDate
					endDate
					description {
						json
					}
				}
			}
		}`;
	const response = await fetchGraphQL(query);
	return response.data.experienceCollection.items;
}

export async function getEducations() {
	const query = `
		query {
			educationCollection(order: endDate_DESC) {
				items {
					_id
					school
					degree
					startDate
					endDate
				}
			}
		}
	`;
	const response = await fetchGraphQL(query);
	return response.data.educationCollection.items;
}
