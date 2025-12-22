import urlFor from "@/lib/urlFor";
import { TemoignagesSectionType } from "@/types";
import Image from "next/image";
import { Carousel, CarouselItem } from "react-bootstrap";

interface TemoignagesSectionProps {
  section: TemoignagesSectionType;
}

export default function TemoignagesSection({
  section,
}: TemoignagesSectionProps) {
  return (
    <section className="section  section-animate section__temoignages">
      <div className="container">
        {section.title !== undefined && (
          <h1 className="text-center">{section.title}</h1>
        )}
        {section.description !== undefined && (
          <p className="text-center">{section.description}</p>
        )}
        {section.temoignages.length > 0 && (
          <Carousel interval={100000}>
            {section.temoignages?.map((temoignage) => {
              const temoignageImageUrl = temoignage.image
                ? urlFor(temoignage.image).size(200, 200).fit("crop").url()
                : "";

              return (
                <CarouselItem key={temoignage._key}>
                  <div className="temoignage__card row">
                    <div className="col-md-3">
                      <Image
                        src={temoignageImageUrl}
                        alt={temoignage.nom}
                        width="200"
                        height="200"
                        className="temoignage__image img-fluid"
                      />
                    </div>
                    <div className="col-md-8">
                      <blockquote className="blockquote">
                        <em>{temoignage.message}</em>
                      </blockquote>
                      <h3 className="temoignage__name">{temoignage.nom}</h3>
                      <p className="temoignage__role">{temoignage.position}</p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </Carousel>
        )}
      </div>
    </section>
  );
}
