import { getSummary } from "./lib/data";
import Summary from "./ui/summary";

export default async function Home() {
	const summary = await getSummary();
	return <Summary summary={summary} />;
}
