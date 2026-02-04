import Image from "next/image";
import { PhotoGallerySectionType } from "@/types";
import urlFor from "@/lib/urlFor";

interface PhotoGallerySectionProps {
  section: PhotoGallerySectionType;
}

export default function PhotoGallery({ section }: PhotoGallerySectionProps) {
  return (
    <section className="container py-5">
      <h2 className="section-title mb-5 text-center">Gallery</h2>

      <div className="masonry">
        {section.photos.map((photo) => {
          const imageUrl = urlFor(photo).width(1200).url();

          return (
            <div key={photo._key} className="masonry-item">
              <Image
                src={imageUrl}
                alt={photo._alt || "Gallery Image"}
                width={photo.asset?.metadata?.dimensions?.width || 800}
                height={photo.asset?.metadata?.dimensions?.height || 1000}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="masonry-img"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
