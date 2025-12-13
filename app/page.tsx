import TemporaryClientComponent from "@/app/components/temporary-client-component";
import { fetchComments } from "@/app/lib/data";

export default async function App() {
  const comments = await fetchComments();

  if (comments instanceof Response) return <p>Something went wrong</p>;

  return <TemporaryClientComponent comments={comments} />;
}
