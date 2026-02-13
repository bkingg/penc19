import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Navigation from "./Navigation";
import urlFor from "@/lib/urlFor";

const MENU_ITEM_FRAGMENT = groq`
  _key,
  title,
  linkType,
  internalLink->{_id, _type, title, slug, image},
  externalUrl,
  submenuItems[]`;

const SITE_SETTINGS_QUERY = groq`*[
  _type == "siteSettings"
  && language == $language
][0]{
  logo,
  mainMenu->{
    _id, 
    title, 
    handle,
    items[]{
      ${MENU_ITEM_FRAGMENT}{
        ${MENU_ITEM_FRAGMENT}{
          ${MENU_ITEM_FRAGMENT}
        }
      }
    }
  },
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
}`;

export default async function Header({ language }: { language: string }) {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
    params: { language: language },
  });

  console.log(siteSettings);

  siteSettings.logoUrl = siteSettings?.logo
    ? urlFor(siteSettings.logo).width(300).url()
    : undefined;

  return (
    <>
      <Navigation language={language} siteSettings={siteSettings} />
    </>
  );
}
