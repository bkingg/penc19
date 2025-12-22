"use client";

import { FAQSectionType } from "@/types";
import { PortableText } from "next-sanity";
import { Accordion } from "react-bootstrap";

interface FAQSectionProps {
  section: FAQSectionType;
}

export default function FAQSection({ section }: FAQSectionProps) {
  return (
    <section className="section section__faq">
      <div className="container">
        {section.title !== undefined && <h1>{section.title}</h1>}
        {section.description !== undefined && <p>{section.description}</p>}
        <div className="">
          <Accordion flush>
            {section.faq?.map(({ _key, question, reponse }) => {
              return (
                <Accordion.Item key={_key} eventKey={_key}>
                  <Accordion.Header>{question}</Accordion.Header>
                  <Accordion.Body>
                    <PortableText value={reponse} />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
