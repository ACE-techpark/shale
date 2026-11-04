"use client";

import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Occasions() {
  const { messages } = useLanguage();
  return (
    <section
      id="occasions"
      tabIndex={-1}
      aria-labelledby="occasions-heading"
      className="section-space occasions-section"
    >
      <Container>
        <SectionHeading
          id="occasions-heading"
          number="03"
          title={messages.occasions.title}
          description={messages.occasions.intro}
        />
        <div className="occasions-grid">
          {site.occasions.map((occasion, index) => (
            <article className="occasion" key={index}>
              <div className="occasion-top">
                <span className="occasion-icon">
                  <Icon name={occasion.icon} />
                </span>
                <span className="occasion-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3>{messages.occasions.items[index].title}</h3>
              <p>{messages.occasions.items[index].description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
