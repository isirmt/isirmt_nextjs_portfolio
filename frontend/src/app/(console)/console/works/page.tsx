import WorkRegisterForm from "@/components/console/workRegisterForm";
import { ImagesProvider } from "@/contexts/imagesContext";
import { WorksProvider } from "@/contexts/worksContext";
import sessionChecker from "@/lib/console/sessionChecker";

export default async function ImagesConsolePage() {
  await sessionChecker();
  return (
    <main className="relative w-full space-y-8 px-16 py-8">
      <ImagesProvider>
        <WorksProvider>
          <WorkRegisterForm />
        </WorksProvider>
      </ImagesProvider>
    </main>
  );
}
