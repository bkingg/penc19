import urlFor from "@/lib/urlFor";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageAssetDocument } from "next-sanity";

// 👇 Strongly typed component props
const CustomImageComponent = ({
  value,
}: {
  value: SanityImageAssetDocument;
}) => {
  return (
    <div className="mb-4">
      <Image
        src={urlFor(value.asset).width(800).url()}
        width={800}
        height={0}
        alt={value.alt || "Image"}
        className="img-fluid rounded"
      />
    </div>
  );
};

// 👇 Typed components map for PortableText
const components: PortableTextComponents = {
  types: {
    image: CustomImageComponent,
  },
};

// 👇 Strongly type the content prop
interface CustomPortableTextProps {
  content: PortableTextBlock[];
}

export default function CustomPortableText({
  content,
}: CustomPortableTextProps) {
  return <PortableText value={content} components={components} />;
}
