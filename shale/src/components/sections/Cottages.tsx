"use client";

import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Cottages() {
  const { messages, language } = useLanguage();
  return (
    <section
      id="cottages"
      tabIndex={-1}
      aria-labelledby="cottages-heading"
      className="section-space cottages-section"
    >
      <Container>
        <div className="section-top">
          <SectionHeading
            id="cottages-heading"
            number="02"
            title={messages.cottages.title}
            description={messages.cottages.intro}
          />
          <span className="small-tag">01 — 02</span>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {site.cottages.map((cottage, cottageIndex) => (
            <article key={cottage.id} className="cottage-card">
              <Media
                image={cottage.image}
                imageAlt={site.gallery[cottageIndex === 0 ? "koteji" : "saxli"][0].alt[language]}
                label={messages.cottages.items[cottageIndex].title}
                number={cottage.id}
                className={`cottage-media cottage-media-${cottage.id}`}
              />
              <div className="cottage-content">
                <div className="flex items-center justify-between gap-4">
                  <h3>{messages.cottages.items[cottageIndex].title}</h3>
                  <span className="cottage-index" aria-hidden="true">
                    /{cottage.id}
                  </span>
                </div>
                <p className="body-copy">
                  {messages.cottages.description}
                </p>
                {cottage.details ? (
                  <ul className="cottage-details">
                    {messages.cottages.items[cottageIndex].details.map((detail, detailIndex) => (
                      <li key={detailIndex}>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path d="m3 8 3.2 3.2L13 4.8" />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="details-pending">
                    <span />
                    {messages.cottages.detailsPending}
                  </p>
                )}
                <a
                  href="#contact"
                  className="cottage-cta"
                  aria-label={`${messages.cottages.items[cottageIndex].title} — ${messages.cottages.cta}`}
                >
                  {messages.cottages.cta}
                  <Icon name="arrowUp" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
