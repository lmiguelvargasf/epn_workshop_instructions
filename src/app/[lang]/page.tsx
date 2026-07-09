import { notFound } from "next/navigation";
import { WorkshopPage } from "@/components/workshop-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <WorkshopPage locale={lang} dictionary={dictionary} />;
}
