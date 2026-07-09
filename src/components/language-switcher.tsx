"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
};

export function LanguageSwitcher({
  locale,
  label,
  names,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchedPath = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-surface p-0.5"
      role="group"
      aria-label={label}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchedPath(code)}
            hrefLang={code}
            lang={code}
            title={names[code]}
            aria-label={names[code]}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
