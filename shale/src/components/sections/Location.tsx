"use client";

import { site } from "@/data/site";
import { mapHref } from "@/lib/contacts";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Location() {
  const { messages } = useLanguage();
  const href = mapHref(site.location);
  return (
    <section
      id="location"
      tabIndex={-1}
      aria-labelledby="location-heading"
      className="section-space location-section"
    >
      <Container className="location-grid">
        <div>
          <SectionHeading
            id="location-heading"
            number="06"
            title={messages.location.title}
          />
          <p className="location-label">
            <Icon name="pin" />
            {messages.locationLabel}
          </p>
          <p className="body-copy">{messages.location.description}</p>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {messages.location.cta}
              <Icon name="arrowUp" />
            </a>
          ) : (
            <p className="location-pending">{messages.location.description}</p>
          )}
        </div>
        <div className="location-map">
          <iframe
            src="https://www.google.com/maps?q=41.8931913,42.0661844&z=16&output=embed"
            title={messages.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            width="100%"
            height={450}
          />
          <p className="location-address">{messages.location.address}</p>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-light location-route"
            >
              {messages.location.route}
              <Icon name="arrowUp" />
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
