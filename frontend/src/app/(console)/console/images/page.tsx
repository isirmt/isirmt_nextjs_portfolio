import DAndDContentBox from "@/components/console/dAndDContentBox";
import ImagesViewer from "@/components/console/imagesViewer";
import { auth } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function ImagesConsolePage() {
  const session = await auth();

  if (!session) {
    redirect("/console/login");
  }

  return (
    <main className="relative w-full space-y-8 px-16 py-8">
      <DAndDContentBox />
      <ImagesViewer />
    </main>
  );
}
