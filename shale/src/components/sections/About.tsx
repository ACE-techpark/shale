"use client";

import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function About() {
  const { messages, language } = useLanguage();
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      className="section-space about-section"
    >
      <Container className="about-grid">
        <div className="about-copy">
          <SectionHeading
            id="about-heading"
            number="01"
            title={messages.about.title}
          />
          <p className="editorial-lead">{messages.about.lead}</p>
          <p className="body-copy">{messages.about.description}</p>
          <a href="#cottages" className="text-link">
            {messages.about.link}
            <Icon name="arrowUp" />
          </a>
        </div>
        <div className="about-visual">
          <Media
            image={site.about.image}
            imageAlt={site.about.image.alt[language]}
            label={messages.about.media}
            className="about-media"
          />
          <div className="about-count">
            <span>02</span>
            <p>
              {messages.hero.cottageCount}
              <br />
              <span>{messages.locationLabel}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
