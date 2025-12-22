import CustomPortableText from "@/components/CustomPortableText";
import { RichTextSectionType } from "@/types";

interface RichTextSectionProps {
  section: RichTextSectionType;
}

export default async function RichTextSection({
  section,
}: RichTextSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <CustomPortableText content={section.richText} />
      </div>
    </section>
  );
}
