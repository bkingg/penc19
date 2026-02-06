import {
  SanityImageAssetDocument,
  SanityAssetDocument,
  PortableTextBlock,
  SanityDocument,
} from "next-sanity";

export interface BaseSection {
  _key: string;
  _type: string;
}

export interface CallToActionSectionType extends BaseSection {
  _type: "call_to_action";
  image: SanityImageAssetDocument;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  brochure: SanityAssetDocument;
  brochureUrl: string;
}

export interface FAQSectionType extends BaseSection {
  title: string;
  description: string;
  faq: QuestionReponse[];
}

export interface QuestionReponse {
  _key: string;
  question: string;
  reponse: PortableTextBlock;
}

export interface LatestArticlesSectionType extends BaseSection {
  _type: "latest_articles";
  title: string;
  description: string;
  actualites: SanityDocument[];
}

export interface LogoListSectionType extends BaseSection {
  _type: "logo_list";
  title: string;
  description: string;
  logos: Logo[];
}

export interface Logo {
  _key: string;
  image: object;
  url: string;
  title: string;
}

export interface MediaTextSectionType extends BaseSection {
  _type: "media_text";
  title: string;
  description: PortableTextBlock[];
  image: SanityImageAssetDocument;
  layoutColor: string;
  layout: string;
  mediaType: string;
  video: {
    title: string;
    url: string;
  };
  showCta: string;
  linkType: string;
  internalLink: {
    _type: string;
    slug: { current: string };
  };
  externalUrl: string;
  ctaText: string;
}

export interface RichTextSectionType extends BaseSection {
  _type: "rich_text";
  richText: PortableTextBlock[];
}

export interface ServicesSectionType extends BaseSection {
  _type: "services";
  title: string;
  description: string;
  services: Service[];
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export interface SliderSectionType extends BaseSection {
  _type: "slider";
  slides: Slide[];
}

export interface Slide {
  _key: string;
  image: SanityImageAssetDocument;
  captionPosition: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

export interface TeamSectionType extends BaseSection {
  _type: "team_members";
  title: string;
  description: string;
  team: TeamMember[];
  ctaText: string;
  ctaUrl: string;
}

export interface TeamMember {
  _key: string;
  image: object;
  title: string;
  description: string;
  // social: ;
}

export interface TemoignagesSectionType extends BaseSection {
  _type: "temoignages";
  title: string;
  description: string;
  temoignages: Temoignage[];
}

export interface Temoignage {
  _key: string;
  image: object;
  nom: string;
  message: string;
  position: string;
}

export interface VideoSectionType extends BaseSection {
  _type: "video";
  title: string;
  description: string;
  url: string;
}

export interface PhotoGallerySectionType extends BaseSection {
  _type: "reference";
  photos: SanityImageAssetDocument[];
}

export type Section =
  | RichTextSectionType
  | VideoSectionType
  | MediaTextSectionType
  | SliderSectionType
  | FAQSectionType
  | LogoListSectionType
  | CallToActionSectionType
  | LatestArticlesSectionType
  | ServicesSectionType
  | TeamSectionType
  | TemoignagesSectionType
  | PhotoGallerySectionType;
