import SessionButton from "@/components/admin/sessionButton";
import { auth } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <main>
      <div>Google OAuthによるログイン</div>
      <SessionButton />
    </main>
  );
}
