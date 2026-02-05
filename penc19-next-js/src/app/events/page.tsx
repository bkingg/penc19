import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

const EVENTS_QUERY = groq`*[
  _type == "event"
  && defined(slug.current)
]{_id, 
  title, 
  slug, 
  image, 
  description,
  startDate,
  sections[]{
    ...,
    "brochureUrl": brochure.asset->url,
    services[]->{
      _id, title, slug, image
    },
    projets[]->{
      _id, title, ville, slug, image
    },
    temoignages
  }
}`;

export default async function Events() {
  const events = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Events</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Events</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section container">
        <div className="masonry">
          {events.map((event) => {
            const imageUrl = urlFor(event.image).width(1200).url();
            return (
              <Link
                href={`/events/${event.slug.current}`}
                className="event"
                key={event._id}
              >
                <div className="masonry-item">
                  <Image
                    src={imageUrl}
                    alt={event._alt || "Gallery Image"}
                    width={event.asset?.metadata?.dimensions?.width || 800}
                    height={event.asset?.metadata?.dimensions?.height || 1000}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="masonry-img"
                  />
                  <div className="event-caption">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">
                      {new Date(event.startDate).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
