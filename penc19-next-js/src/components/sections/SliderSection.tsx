import urlFor from "@/lib/urlFor";
import { SliderSectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

interface SliderSectionProps {
  section: SliderSectionType;
}

export default function SliderSection({ section }: SliderSectionProps) {
  return (
    <section className="section__slider">
      <Carousel interval={1000}>
        {section.slides?.map((slide) => {
          const slideImageUrl = slide.image
            ? urlFor(slide.image).size(1200, 700).fit("crop").url()
            : "";
          return (
            <CarouselItem key={slide._key}>
              <Image
                src={slideImageUrl}
                width={1200}
                height={500}
                alt={slide.title}
                className="d-block w-100 img-fluid carousel-image"
              />
              {(slide.title || slide.description) && (
                <CarouselCaption className={slide.captionPosition}>
                  <div
                    className={`carousel-caption__wrapper ${slide.captionPosition}`}
                  >
                    {slide.title && <h3 className="vidaloka">{slide.title}</h3>}
                    {slide.description && <p>{slide.description}</p>}
                    {slide.ctaText && slide.ctaUrl && (
                      <Link className="btn btn-primary" href={slide.ctaUrl}>
                        {slide.ctaText}
                      </Link>
                    )}
                  </div>
                </CarouselCaption>
              )}
            </CarouselItem>
          );
        })}
      </Carousel>
    </section>
  );
}
