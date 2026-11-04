"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { MobileMenu } from "./MobileMenu";
import { useLanguage } from "@/components/providers/SiteProvider";
import { SiteControls } from "@/components/ui/SiteControls";
export function Header() {
  const { messages } = useLanguage();
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label={`${messages.brand} — ${messages.nav[0]}`}
        >
          <BrandMark className="header-logo" />
          <span>{messages.brand}</span>
        </Link>
        <nav className="desktop-navigation" aria-label={messages.navAria}>
          {site.navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={item.href === "#contact" ? "nav-contact" : ""}
            >
              {messages.nav[index]}
            </a>
          ))}
        </nav>
        <div className="header-controls"><SiteControls /></div>
        <MobileMenu items={site.navigation} />
      </Container>
    </header>
  );
}
