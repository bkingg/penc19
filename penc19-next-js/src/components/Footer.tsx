import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, PortableText, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  _key: string;
  title: string;
  linkType: string;
  internalLink: {
    _type: string;
    slug: { current: string };
  };
  externalUrl: string;
}

export default async function Footer({ language }: { language: string }) {
  const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings" && language == $language][0]{
    // Language
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
    // Header
    logo,
    // Footer
    footerBgImage,
    footerLogo,
    footerDescription,
    footerMenu->{
      items[]{
        _key,
        title,
        linkType,
        internalLink->{
          _type,
          slug
        },
        externalUrl
      }
    },
    facebook,
    twitter,
    instagram,
    linkedin,

    contactPageTitle,
    contactPageImage,
    showMap,
    contactPageSubTitle,
    contactPageDescription,
    phone,
    address,
    email,
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
    params: { language }, // You can replace this with the actual language parameter
  });
  console.log("footer menu", siteSettings.footerMenu);
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            {siteSettings.footerLogo && (
              <Image
                src={urlFor(siteSettings.footerLogo)
                  .width(300)
                  .crop("center")
                  .url()}
                width={400}
                height={0}
                alt="Penc 19"
                title="Penc 19"
                className="img-fluid mb-3"
              />
            )}
            {siteSettings.address && (
              <PortableText value={siteSettings.address} />
            )}
            <PortableText value={siteSettings.email} />
            <PortableText value={siteSettings.phone} />
            <p>© 2025 Penc 19</p>
          </div>
          <div className="footer__address col-sm-8 mb-3">
            <h5 className="mono mb-4">
              {language === "en" ? "Connect with us" : "Restez Connectés"}
            </h5>
            <ul className="nav footer__social">
              {siteSettings.twitter && (
                <li className="nav-item">
                  <Link
                    className="link-body-emphasis nav-link"
                    href={siteSettings.twitter}
                    target="_blank"
                  >
                    <i className="bi bi-twitter"></i>
                  </Link>
                </li>
              )}
              {siteSettings.instagram && (
                <li className="nav-item">
                  <Link
                    className="link-body-emphasis nav-link"
                    href={siteSettings.instagram}
                    target="_blank"
                  >
                    <i className="bi bi-instagram"></i>
                  </Link>
                </li>
              )}
              {siteSettings.facebook && (
                <li className="nav-item">
                  <Link
                    className="link-body-emphasis nav-link"
                    href={siteSettings.facebook}
                    target="_blank"
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                </li>
              )}
              {siteSettings.linkedin && (
                <li className="nav-item">
                  <Link
                    className="link-body-emphasis nav-link"
                    href={siteSettings.linkedin}
                    target="_blank"
                  >
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={`/${language}/donate`}
                  className="btn btn-sm btn-primary donate-button"
                >
                  {language === "en" ? "Donate" : "Faire un don"}
                </Link>
              </li>
            </ul>
            <div className="footer__newsletter mb-4">
              <form>
                <div className="row d-flex align-items-center">
                  <p>
                    {language === "en"
                      ? "Join the Penc 19 Email list"
                      : "Rejoindre la Newsletter de Penc 19"}
                  </p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">
                      {language === "en" ? "Email address" : "Adresse Email"}
                    </label>
                    <input
                      id="newsletter1"
                      type="text"
                      className="form-control"
                      placeholder={
                        language === "en" ? "Email address" : "Adresse Email"
                      }
                    />
                    <button className="btn btn-primary" type="button">
                      {language === "en" ? "Subscribe" : "S'abonner"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <ul className="nav">
              {siteSettings.footerMenu.items?.map((item: MenuItem) => (
                <li className="nav-item" key={item._key}>
                  <Link
                    className="nav-link"
                    href={
                      item.linkType === "internal"
                        ? `/${language}/${item.internalLink?._type}s/${item.internalLink?.slug.current}`
                        : item.externalUrl
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
