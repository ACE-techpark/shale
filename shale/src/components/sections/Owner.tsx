"use client";

import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Owner() {
  const { messages, language } = useLanguage();
  return (
    <section
      id="owner"
      tabIndex={-1}
      aria-labelledby="owner-heading"
      className="owner-section section-space"
    >
      <Container className="owner-grid">
        <Media
          image={site.owner.image}
          imageAlt={site.owner.image.alt[language]}
          label={messages.owner.photo}
          portrait
          className="owner-media"
          sizes="(max-width: 339px) calc(100vw - 40px), (max-width: 767px) 300px, (max-width: 899px) 240px, (max-width: 1199px) 300px, 340px"
        />
        <div className="owner-copy">
          <SectionHeading
            id="owner-heading"
            number="05"
            title={messages.owner.title}
          />
          <p className="owner-lead">{messages.owner.lead}</p>
          <h3>{messages.owner.name}</h3>
          <p className="owner-role">{messages.owner.role}</p>
          <div className="owner-contact-links">
            <ContactLinks />
          </div>
        </div>
      </Container>
    </section>
  );
}
