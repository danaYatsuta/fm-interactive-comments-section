import TemporaryClientComponent from "@/app/components/temporary-client-component";
import { fetchComments } from "@/app/lib/data";

export default async function App() {
  const comments = await fetchComments();

  // TODO proper error handling
  if (comments instanceof Response) throw new Error("Failed to fetch comments");

  return <TemporaryClientComponent comments={comments} />;
}
