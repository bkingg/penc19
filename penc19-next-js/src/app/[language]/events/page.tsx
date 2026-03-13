import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  NavLink,
  Pagination,
} from "react-bootstrap";

export default async function Events({
  params,
  searchParams,
}: {
  params: Promise<{ language: string }>;
  searchParams?: Promise<{ type?: string; page?: string }>;
}) {
  const { language } = await params;
  const { type = "upcoming", page = "1" } = (await searchParams) || {};

  const pageNumber = parseInt(page);
  const pageSize = 6;
  const offset = (pageNumber - 1) * pageSize;

  const now = new Date().toISOString();

  const EVENTS_QUERY = groq`*[
  _type == "event"
    && language == $language
    && defined(slug.current)
    && (
      ($type == "upcoming" && startDate >= $now) ||
      ($type == "past" && startDate < $now)
    )
  ] | order(startDate desc) [$offset...$limit] {
    _id, 
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
    },
    // Language
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
  }`;

  const events = await sanityFetch<SanityDocument[]>({
    query: EVENTS_QUERY,
    params: {
      language,
      type,
      now,
      offset,
      limit: offset + pageSize,
    },
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">
          {language === "en" ? "Events" : "Événements"}
        </h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">
            {language === "en" ? "Home" : "Accueil"}
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {language === "en" ? "Events" : "Événements"}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section container events">
        <Nav variant="pills" activeKey={type} className="events__filter mb-4">
          <NavItem>
            <NavLink
              as={Link}
              href={`/${language}/events?type=upcoming`}
              eventKey="upcoming"
            >
              {language === "en" ? "Upcoming Events" : "Événements à venir"}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              as={Link}
              href={`/${language}/events?type=past`}
              eventKey="past"
            >
              {language === "en" ? "Past Events" : "Événements passés"}
            </NavLink>
          </NavItem>
        </Nav>
        <div className="masonry">
          {events.length ? (
            events.map((event) => {
              console.log("event single", event);
              const imageUrl = urlFor(event.image).width(1200).url();
              return (
                <Link
                  href={`/${language}/events/${event.slug.current}`}
                  className="event"
                  key={event._id}
                >
                  <div className="masonry-item">
                    <Image
                      src={imageUrl}
                      alt={event.alt || "Gallery Image"}
                      width={event.asset?.metadata?.dimensions?.width || 800}
                      height={event.asset?.metadata?.dimensions?.height || 1000}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="masonry-img"
                    />
                    <div className="event-caption">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-date">
                        {new Date(event.startDate).toLocaleDateString(
                          language,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              <p>
                {language === "en"
                  ? (type === "upcoming" && "No Upcoming Events") ||
                    (type === "past" && "No Past Events")
                  : (type === "upcoming" && "Aucun événement à venir") ||
                    (type === "past" && "Aucun événement passé")}
              </p>
            </>
          )}
        </div>

        {/* 🔢 PAGINATION */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination className="pagination events__pagination">
            {pageNumber > 1 && (
              <Link
                className="page-link"
                href={`/${language}/events?type=${type}&page=${pageNumber - 1}`}
              >
                Previous
              </Link>
            )}

            {events.length === pageSize && (
              <Link
                className="page-link"
                href={`/${language}/events?type=${type}&page=${pageNumber + 1}`}
              >
                Next
              </Link>
            )}
          </Pagination>
        </div>
      </div>
    </>
  );
}
