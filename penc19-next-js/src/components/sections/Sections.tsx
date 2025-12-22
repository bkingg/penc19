import LatestArticlesSection from "./LatestArticlesSection";
import LogoListSection from "./LogoListSection";
import RichTextSection from "./RichTextSection";
import SliderSection from "./SliderSection";
import CallToActionSection from "./CallToActionSection";
import ServicesSection from "./ServicesSection";
import FAQSection from "./FAQSection";
import MediaTextSection from "./MediaTextSection";
import TeamSection from "./TeamSection";
import TemoignagesSection from "./TemoignagesSection";
import VideoSection from "./VideoSection";
import {
  CallToActionSectionType,
  FAQSectionType,
  LatestArticlesSectionType,
  LogoListSectionType,
  MediaTextSectionType,
  RichTextSectionType,
  Section,
  ServicesSectionType,
  SliderSectionType,
  TeamSectionType,
  TemoignagesSectionType,
  VideoSectionType,
} from "@/types";

interface SectionsProps {
  sections: Section[];
}

export default async function Sections({ sections }: SectionsProps) {
  return (
    <>
      {sections.map(
        (section: Section) =>
          (section._type == "rich_text" && (
            <RichTextSection
              key={section._key}
              section={section as RichTextSectionType}
            />
          )) ||
          (section._type == "video" && (
            <VideoSection
              key={section._key}
              section={section as VideoSectionType}
            />
          )) ||
          (section._type == "media_text" && (
            <MediaTextSection
              key={section._key}
              section={section as MediaTextSectionType}
            />
          )) ||
          (section._type == "slider" && (
            <SliderSection
              key={section._key}
              section={section as SliderSectionType}
            />
          )) ||
          (section._type == "faq" && (
            <FAQSection
              key={section._key}
              section={section as FAQSectionType}
            />
          )) ||
          (section._type == "logo_list" && (
            <LogoListSection
              key={section._key}
              section={section as LogoListSectionType}
            />
          )) ||
          (section._type == "call_to_action" && (
            <CallToActionSection
              key={section._key}
              section={section as CallToActionSectionType}
            />
          )) ||
          (section._type == "latest_articles" && (
            <LatestArticlesSection
              key={section._key}
              section={section as LatestArticlesSectionType}
            />
          )) ||
          (section._type == "services" && (
            <ServicesSection
              key={section._key}
              section={section as ServicesSectionType}
            />
          )) ||
          (section._type == "team_members" && (
            <TeamSection
              key={section._key}
              section={section as TeamSectionType}
            />
          )) ||
          (section._type == "temoignages" && (
            <TemoignagesSection
              key={section._key}
              section={section as TemoignagesSectionType}
            />
          ))
      )}
    </>
  );
}
