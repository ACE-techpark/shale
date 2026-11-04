"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";

type GalleryProperty = keyof typeof site.gallery;

export function Gallery() {
  const { language, messages } = useLanguage();
  const [property, setProperty] = useState<GalleryProperty>("koteji");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const currentPhotos = site.gallery[property];
  const propertyCopy = messages.gallery.properties[property];
  const lightboxOpen = selectedIndex !== null;
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    function updateColumnCount() {
      setColumnCount(
        window.innerWidth <= 479 ? 1 : window.innerWidth <= 899 ? 2 : 3,
      );
    }
    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrevious = useCallback(() => {
    setSelectedIndex((index) =>
      index === null ? null : Math.max(0, index - 1),
    );
  }, []);
  const showNext = useCallback(() => {
    setSelectedIndex((index) =>
      index === null
        ? null
        : Math.min(currentPhotos.length - 1, index + 1),
    );
  }, [currentPhotos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not(:disabled)",
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (openerRef.current?.isConnected) openerRef.current.focus();
    };
  }, [lightboxOpen, closeLightbox, showNext, showPrevious]);

  useEffect(() => {
    if (selectedIndex === null) return;
    for (const neighborIndex of [selectedIndex - 1, selectedIndex + 1]) {
      const neighbor = currentPhotos[neighborIndex];
      if (!neighbor) continue;
      const preloadedImage = new window.Image();
      preloadedImage.src = neighbor.src;
    }
  }, [currentPhotos, selectedIndex]);

  function onTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;
    const distance = endX - startX;
    if (distance < -50) showNext();
    if (distance > 50) showPrevious();
  }

  return (
    <section
      id="gallery"
      tabIndex={-1}
      aria-labelledby="gallery-heading"
      className="section-space gallery-section"
    >
      <Container>
        <SectionHeading
          id="gallery-heading"
          number="04"
          title={messages.gallery.title}
        />
        <div
          className="gallery-property-switch"
          role="group"
          aria-label={messages.gallery.choose}
        >
          <button
            type="button"
            aria-pressed={property === "koteji"}
            aria-label={`${messages.gallery.properties.koteji.heading}, ${site.gallery.koteji.length} ${messages.gallery.photos}`}
            className={property === "koteji" ? "is-active" : ""}
            onClick={() => setProperty("koteji")}
          >
            <span>{messages.gallery.properties.koteji.heading}</span>
            <span className="gallery-photo-count">
              {site.gallery.koteji.length}
            </span>
          </button>
          <button
            type="button"
            aria-pressed={property === "saxli"}
            aria-label={`${messages.gallery.properties.saxli.heading}, ${site.gallery.saxli.length} ${messages.gallery.photos}`}
            className={property === "saxli" ? "is-active" : ""}
            onClick={() => setProperty("saxli")}
          >
            <span>{messages.gallery.properties.saxli.heading}</span>
            <span className="gallery-photo-count">
              {site.gallery.saxli.length}
            </span>
          </button>
        </div>
        <div className="gallery-property-copy" aria-live="polite">
          <h3>{propertyCopy.heading}</h3>
          <p>{propertyCopy.description}</p>
        </div>
        <div
          id="gallery-photos"
          key={property}
          className="gallery-grid"
          role="group"
          aria-label={propertyCopy.heading}
        >
          {currentPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className="gallery-photo-button"
              aria-label={`${photo.alt[language]}, ${index + 1} / ${currentPhotos.length}`}
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            >
              <span className="gallery-photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt[language]}
                  fill
                  sizes="(max-width: 479px) 100vw, (max-width: 899px) 50vw, 33vw"
                  loading="lazy"
                  fetchPriority={index < columnCount ? "high" : "auto"}
                  className="gallery-thumbnail"
                />
              </span>
            </button>
          ))}
        </div>
      </Container>

      {selectedIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyCopy.heading} ${messages.gallery.gallery}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="gallery-lightbox-panel" ref={dialogRef}>
            <button
              ref={closeButtonRef}
              type="button"
              className="gallery-lightbox-close"
              aria-label={messages.gallery.close}
              onClick={closeLightbox}
            >
              <Icon name="close" />
            </button>
            <div
              className="gallery-lightbox-stage"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="gallery-lightbox-image">
                <Image
                  src={currentPhotos[selectedIndex].src}
                  alt={currentPhotos[selectedIndex].alt[language]}
                  fill
                  sizes="100vw"
                  loading="eager"
                  fetchPriority="high"
                  className="gallery-lightbox-image-element"
                />
              </div>
              <button
                type="button"
                className="gallery-lightbox-arrow gallery-lightbox-previous"
                aria-label={messages.gallery.previous}
                disabled={selectedIndex === 0}
                onClick={showPrevious}
              >
                <Icon name="arrow" />
              </button>
              <button
                type="button"
                className="gallery-lightbox-arrow gallery-lightbox-next"
                aria-label={messages.gallery.next}
                disabled={selectedIndex === currentPhotos.length - 1}
                onClick={showNext}
              >
                <Icon name="arrow" />
              </button>
            </div>
            <p className="gallery-lightbox-counter" aria-live="polite">
              {selectedIndex + 1} / {currentPhotos.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
