"use client";

import { useEffect, useRef, useState } from "react";
import type { NavigationItem } from "@/types/site";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
import { SiteControls } from "@/components/ui/SiteControls";

export function MobileMenu({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const { messages } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 1200px)");
    function onResize() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <div
      className="mobile-navigation"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? messages.menuClose : messages.menuOpen}
        onClick={() => setOpen(!open)}
      >
        <span>{messages.menu}</span>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label={messages.mobileNavAria}
        hidden={!open}
      >
        <div className="mobile-menu-controls"><SiteControls /></div>
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => {
              setOpen(false);
              document
                .getElementById(item.href.slice(1))
                ?.focus({ preventScroll: true });
            }}
          >
            {messages.nav[index]}
            <Icon name="arrowUp" />
          </a>
        ))}
      </nav>
    </div>
  );
}
