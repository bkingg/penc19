import DonateForm from "@/components/DonateForm";

export default async function DonatePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  return <DonateForm language={language} />;
}
