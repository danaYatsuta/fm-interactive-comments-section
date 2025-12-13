import TemporaryClientComponent from "@/app/components/temporary-client-component";
import { fetchComments } from "@/app/lib/data";

export default async function App() {
  const comments = await fetchComments();

  if (comments instanceof Response) {
    const json = await comments.json();

    return <p>{JSON.stringify(json)}</p>;
  }

  return <TemporaryClientComponent comments={comments} />;
}
