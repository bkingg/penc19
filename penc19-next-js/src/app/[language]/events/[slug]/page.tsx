import { sanityFetch } from "@/sanity/client";
import { groq, PortableText, SanityDocument } from "next-sanity";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Sections from "@/components/sections/Sections";

let event: SanityDocument;
let eventImageUrl: string;

export default async function Event({
  params,
}: {
  params: Promise<{ language: string; slug: string[] }>;
}) {
  const { language, slug } = await params;
  const EVENT_QUERY = groq`
    *[
      _type == "event"
      && language == $language
      && defined(slug.current)
      && slug.current == $slug
    ][0]{
      _id, 
      title, 
      image, 
      slug, 
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
        temoignages,
      },
      // Language
      language,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        title,
        slug,
        language
      },
    }`;
  event = await sanityFetch<SanityDocument>({
    query: EVENT_QUERY,
    params: { language, slug },
  });

  if (!event) notFound();

  eventImageUrl = urlFor(event?.image).width(1000).url();

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
          <BreadcrumbItem href={`/${language}/events`}>
            {language === "en" ? "Events" : "Événements"}
          </BreadcrumbItem>
          <BreadcrumbItem active>{event.title}</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="event">
        <div className="container section">
          <h2 className="event__title">{event.title}</h2>
          <p className="event__date">
            {new Date(event.startDate).toLocaleDateString(language, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <PortableText value={event.description} />
        </div>
        {event.sections && <Sections sections={event.sections} />}
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: event?.title,
    openGraph: {
      images: [eventImageUrl],
    },
  };
}
