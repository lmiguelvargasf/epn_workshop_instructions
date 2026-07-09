"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AccountsSection } from "@/components/accounts-section";
import { InstallSection } from "@/components/install-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ReadySection } from "@/components/ready-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { PROMPTS_URL, TEMPLATE_URL } from "@/components/workshop-data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type WorkshopPageProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function WorkshopPage({ locale, dictionary }: WorkshopPageProps) {
  const reduceMotion = useReducedMotion();
  const t = dictionary;

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      <div className="ambient-orb -left-24 top-16 h-72 w-72 opacity-80" aria-hidden />
      <div
        className="ambient-orb right-[-4rem] top-[28rem] h-80 w-80 opacity-70"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/epn-logo.png"
            alt="Escuela Politécnica Nacional"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          <div className="flex min-w-0 items-baseline gap-3">
            <p className="truncate font-display text-xl tracking-tight text-foreground sm:text-2xl">
              {t.header.brand}
            </p>
            <span className="hidden text-sm text-muted sm:inline">
              {t.header.tagline}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher
            locale={locale}
            label={t.language.label}
            names={{ en: t.language.en, es: t.language.es }}
          />
          <ThemeToggle
            switchToLight={t.theme.switchToLight}
            switchToDark={t.theme.switchToDark}
          />
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-6 pb-16 pt-6 sm:px-8 sm:pb-24">
          <motion.p
            className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent"
            {...fadeUp(0)}
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            className="max-w-3xl font-display text-[clamp(2.6rem,8vw,5.4rem)] leading-[0.95] tracking-[-0.04em] text-foreground"
            {...fadeUp(0.08)}
          >
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            {...fadeUp(0.16)}
          >
            {t.hero.description}
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-3" {...fadeUp(0.24)}>
            <a
              href="#install"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.hero.startSetup}
            </a>
            <a
              href={TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.hero.openTemplate}
            </a>
            <a
              href={PROMPTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.hero.openPrompts}
            </a>
          </motion.div>
        </section>

        <InstallSection reduceMotion={!!reduceMotion} copy={t.install} />
        <AccountsSection reduceMotion={!!reduceMotion} copy={t.accounts} />
        <ReadySection copy={t.ready} />
      </main>

      <footer className="relative z-10 border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{t.footer.left}</p>
          <p>{t.footer.right}</p>
        </div>
      </footer>
    </div>
  );
}
