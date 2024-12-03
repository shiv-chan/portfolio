const { CF_SPACE_ID, CF_DELIVERY_ACCESS_TOKEN } = process.env as {
	[key: string]: string;
};

export const tags: string[] = ["about", "works"];

async function fetchGraphQL(query: string) {
	const endpoint = `https://graphql.contentful.com/content/v1/spaces/${CF_SPACE_ID}`;

	try {
		const response = await fetch(`${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${CF_DELIVERY_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
			next: { tags },
		});
		const json = await response.json();

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

export async function getWorks(limit: number = 9) {
	const query = `
		query {
			worksCollection(order: sys_firstPublishedAt_DESC, limit: ${limit}) {
				items {
					_id
					title
					techStack
					slug
				}
			}
		}
	`;
	const response = await fetchGraphQL(query);
	return response.data.worksCollection.items;
}

export async function getWork(slug: string) {
	const query = `
		query {
			worksCollection(where: {slug: "${slug}"}, limit: 1) {
				items {
					previewUrl
					sourceUrl
					thumbnail {
						title
						url
						width
						height
					}
					title
					techStack
					roles
					about {
						json
					}
					notes {
						json
					}
				}
			}
		}
	`;
	const response = await fetchGraphQL(query);
	return response.data.worksCollection.items[0];
}

export async function getAsset(id: string) {
	const query = `
		query {
			asset(id: "${id}") {
				title
				url
				width
				height
			}
		}
	`;
	const response = await fetchGraphQL(query);
	return response.data.asset;
}
