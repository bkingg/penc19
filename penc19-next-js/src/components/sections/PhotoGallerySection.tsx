import Image from "next/image";
import { PhotoGallerySectionType } from "@/types";
import urlFor from "@/lib/urlFor";

interface PhotoGallerySectionProps {
  section: PhotoGallerySectionType;
}

export default function PhotoGallery({ section }: PhotoGallerySectionProps) {
  return (
    <section className="container py-5">
      <h2 className="section-title mb-5">Gallery</h2>

      <div className="masonry">
        {section.photos.map((photo, i) => (
          <div key={photo._key} className="masonry-item mb-4">
            <div
              className="masonry-img-wrapper"
              style={{ position: "relative", width: "100%", height: "400px" }}
            >
              <Image
                src={urlFor(photo).width(1000).url()}
                alt={photo._alt || "Gallery Image"}
                fill
                className="masonry-img"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
