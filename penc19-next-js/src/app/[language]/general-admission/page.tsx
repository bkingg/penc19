// app/[language]/admission/page.tsx
import GeneralAdmissionForm from "@/components/GeneralAdmissionForm";

export default async function AdmissionPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  return <GeneralAdmissionForm language={language} />;
}
