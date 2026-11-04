"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Contours } from "@/components/ui/Contours";
import { Icon } from "@/components/ui/Icon";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { BrandMark } from "@/components/ui/BrandMark";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Hero() {
  const { messages, language } = useLanguage();
  const photo = site.hero.image;
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className={`hero ${photo ? "hero-with-image" : ""}`}
    >
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt={photo.alt[language]}
            fill
            loading="eager"
            sizes="100vw"
            className="property-image"
            style={
              {
                "--image-position": photo.position ?? "center",
                "--image-mobile-position":
                  photo.mobilePosition ?? photo.position ?? "center",
              } as CSSProperties
            }
          />
          <div className="hero-overlay" />
        </>
      ) : (
        <div className="hero-art" aria-hidden="true">
          <Contours />
          <div className="hero-orbit">
            <div className="hero-orbit-inner">
              <BrandMark className="hero-logo" />
            </div>
          </div>
          <span className="art-cross art-cross-one">+</span>
          <span className="art-cross art-cross-two">+</span>
        </div>
      )}
      <Container className="hero-inner">
        <div className="hero-location">
          <span className="status-dot" />
          <Icon name="pin" />
          <span>{messages.locationLabel}</span>
        </div>
        <div className="hero-body">
          <div className="hero-copy">
            <h1 id="hero-heading">
              <span>{messages.brand.split(" ")[0]}</span>
              <span>{messages.brand.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="hero-subtitle">{messages.hero.subtitle}</p>
            <div className="hero-actions">
              <a href="#cottages" className="button button-light">
                {messages.hero.primary}
                <Icon name="arrowUp" />
              </a>
              <a href="#contact" className="button button-outline">
                {messages.hero.secondary}
                <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="hero-aside">
            <div className="cottage-seal">
              <span>02</span>
              <span>{messages.hero.cottageCount}</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div>
            <ContactLinks compact />
            <span className="social-note">{messages.contact.pending}</span>
          </div>
          <p className="hero-bottom-note">{messages.hero.note}</p>
          <a href="#about" className="scroll-link" aria-label={messages.hero.scroll}>
            <span>{messages.hero.scroll}</span>
            <span className="scroll-circle">
              <Icon name="down" />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
