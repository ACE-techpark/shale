"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function Footer() {
  const { messages } = useLanguage();
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div>
            <Link href="/" className="brand">
              <BrandMark className="footer-logo" />
              <span>{messages.brand}</span>
            </Link>
            <p>{messages.footer}</p>
          </div>
          <nav aria-label={messages.footerNavAria}>
            <a href="#cottages">{messages.nav[2]}</a>
            <a href="#gallery">{messages.nav[4]}</a>
            <a href="#contact">{messages.nav[6]}</a>
          </nav>
          <a
            href="#home"
            className="back-top"
            aria-label={messages.backTop}
          >
            <Icon name="arrowUp" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>{messages.locationLabel}</span>
          <span>{messages.brand}</span>
        </div>
      </Container>
    </footer>
  );
}
