import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { Metadata } from "next";
import { groq, PortableText, SanityDocument } from "next-sanity";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Contact",
  description: "Page de Contact",
};

export default async function Contact() {
  const SITE_SETTINGS_QUERY = groq`*[
    _type == "siteSettings"
  ][0]{
    contactPageTitle,
    contactPageImage,
    map,
    contactPageSubTitle,
    contactPageDescription,
    phone,
    address,
    email,
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const contactPageImageUrl = siteSettings?.contactPageImage
    ? urlFor(siteSettings?.contactPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";
  return (
    <>
      <PageHeader image={contactPageImageUrl}>
        <h1 className="page__title">{siteSettings.contactPageTitle}</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Contact</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>

      <div className="section section-animate container">
        {siteSettings.map && (
          <iframe
            src={siteSettings.map}
            width="100%"
            height="400"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
      <div className="section section-animate container">
        <div className="row">
          <div className="contact__address">
            {siteSettings.contactPageSubTitle && (
              <h2 className="h1 text-center">
                {siteSettings.contactPageSubTitle}
              </h2>
            )}
            {siteSettings.contactPageDescription && (
              <p className="text-center">
                {siteSettings.contactPageDescription}
              </p>
            )}
            <div className="text-center">
              <div className="card-block px-2">
                <div className="card-tex contact__address">
                  <PortableText value={siteSettings.address} />
                </div>
              </div>
              <div className="card-block px-2">
                <div className="card-text">
                  <PortableText value={siteSettings.phone} />
                </div>
              </div>
              <div className="card-block px-2">
                <div className="card-text">
                  <PortableText value={siteSettings.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-animate container">
        <div className="row justify-content-center">
          <div className="contact__form col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
