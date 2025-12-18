import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/options";

export default async function HomeConsole() {
  const session = await auth();

  if (!session) {
    redirect("/console/login");
  }

  return <main>Console Page</main>;
}
