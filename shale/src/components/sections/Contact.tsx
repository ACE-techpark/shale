"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Contours } from "@/components/ui/Contours";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Contact() {
  const { messages } = useLanguage();
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="section-space contact-section"
    >
      <Contours />
      <Container className="contact-grid">
        <div>
          <SectionHeading
            id="contact-heading"
            number="07"
            title={messages.contact.title}
          />
          <p className="contact-lead">{messages.contact.lead}</p>
          <p className="contact-description">{messages.contact.description}</p>
        </div>
        <div className="contact-panel">
          <ContactLinks />
          <p className="contact-pending">
            <span className="status-dot" />
            {messages.contact.pending}
          </p>
        </div>
      </Container>
    </section>
  );
}
