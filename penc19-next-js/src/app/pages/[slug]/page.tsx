import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { notFound } from "next/navigation";
import Sections from "@/components/sections/Sections";
import { Metadata } from "next";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { BreadcrumbItem } from "react-bootstrap";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const PAGE_QUERY = groq`
    *[
      _type == "page"
      && defined(slug.current)
      && slug.current == "${slug}"
    ][0]{
      _id, title, slug, image, 
      sections[]{
        ...,
        "brochureUrl": brochure.asset->url,
      },
    }`;
  const page = await sanityFetch<SanityDocument>({ query: PAGE_QUERY });

  if (!page) notFound();

  page.imageUrl = page.image
    ? urlFor(page.image).size(1000, 1000).crop("center").url()
    : undefined;

  return (
    <>
      <PageHeader image={page.imageUrl}>
        {page.title && <h1 className="page__title">{page.title}</h1>}
        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Pages</BreadcrumbItem>
          <BreadcrumbItem active>{page.title}</BreadcrumbItem>
        </Breadcrumb>
        {page.description && <p>{page.description}</p>}
      </PageHeader>
      {page.sections && <Sections sections={page.sections} />}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const PAGE_QUERY = groq`
    *[
      _type == "page"
      && defined(slug.current)
      && slug.current == "${slug}"
    ][0]{
      title, image
    }`;
  const page = await sanityFetch<SanityDocument>({ query: PAGE_QUERY });

  return {
    title: page?.title,
    openGraph: {
      images: [page?.imageUrl],
    },
  };
}
