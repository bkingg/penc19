import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Sections from "@/components/sections/Sections";

export default async function Home() {
  const HOMEPAGE_QUERY = groq`*[
    _type == "page"
    && slug.current == "accueil"
  ][0]{
    _id, 
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
  }`;

  const home = await sanityFetch<SanityDocument>({ query: HOMEPAGE_QUERY });
  return home?.sections && <Sections sections={home.sections} />;
}
