"use client";

import { useLanguage } from "@/components/providers/SiteProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Cottages } from "@/components/sections/Cottages";
import { Occasions } from "@/components/sections/Occasions";
import { Gallery } from "@/components/sections/Gallery";
import { Owner } from "@/components/sections/Owner";
import { Location } from "@/components/sections/Location";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const { messages } = useLanguage();
  return (
    <>
      <a className="skip-link" href="#main">
        {messages.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Cottages />
        <Occasions />
        <Gallery />
        <Owner />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
