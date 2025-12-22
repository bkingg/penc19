import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import CustomPortableText from "@/components/CustomPortableText";
import { MediaTextSectionType } from "@/types";

interface MediaTextSectionProps {
  section: MediaTextSectionType;
}

export default function MediaTextSection({ section }: MediaTextSectionProps) {
  const sectionImageUrl = section.image
    ? urlFor(section.image).width(800).url()
    : "";
  const getYouTubeID = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };
  return (
    <section
      style={{
        backgroundColor: section.layoutColor === "dark" ? "#2c236b" : "",
        color: section.layoutColor === "dark" ? "#fff" : "",
      }}
      className={`section section-animate section__media-text ${section.layoutColor}`}
    >
      <div className="container">
        <div
          className={`row align-items-center ${section.layout === "media_text" ? "" : "flex-row-reverse"}`}
        >
          <div className="col-md-6">
            {(section.mediaType == "image" && (
              <Image
                src={sectionImageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "1.75rem",
                }}
                alt={section.title}
                title={section.title}
                className="img-fluid"
              />
            )) ||
              (section.mediaType == "video" && section.video && (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYouTubeID(section.video.url)}?modestbranding=1&fs=0&controls=0&rel=0`}
                  title={section.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))}
          </div>
          <div className="col-md-6">
            {section.title && <h3>{section.title}</h3>}
            {section.description && (
              <CustomPortableText content={section.description} />
            )}
            {section.showCta && (
              <Link
                className={`btn ${section.layoutColor === "dark" ? "btn-secondary" : "btn-primary"}`}
                href={
                  section.linkType === "internal"
                    ? `/${section.internalLink?._type}s/${section.internalLink?.slug.current}`
                    : section.externalUrl
                }
              >
                {section.ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
