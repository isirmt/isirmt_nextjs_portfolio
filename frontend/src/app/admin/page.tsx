import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/options";
import SessionButton from "@/components/admin/sessionButton";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <>
      Admin Page
      <SessionButton />
    </>
  );
}
