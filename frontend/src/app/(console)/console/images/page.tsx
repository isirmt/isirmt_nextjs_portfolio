import DAndDContentBox from "@/components/console/dAndDContentBox";
import ImagesViewer from "@/components/console/imagesViewer";
import sessionChecker from "@/lib/console/sessionChecker";

export default async function ImagesConsolePage() {
  await sessionChecker();
  return (
    <main className="relative w-full space-y-8 px-16 py-8">
      <DAndDContentBox />
      <ImagesViewer />
    </main>
  );
}
