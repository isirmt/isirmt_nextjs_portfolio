import { auth } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function ImagesConsole() {
  const session = await auth();

  if (!session) {
    redirect("/console/login");
  }

  return <main>Images</main>;
}
