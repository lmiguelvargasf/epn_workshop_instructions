"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const TEMPLATE_URL = "https://github.com/lmiguelvargasf/cursor_workshop";

const accounts = [
  {
    step: "01",
    name: "Cursor",
    purpose: "Your AI-native code editor for the workshop.",
    href: "https://cursor.com",
    cta: "Create Cursor account",
  },
  {
    step: "02",
    name: "GitHub",
    purpose: "Host your project and fork the workshop template.",
    href: "https://github.com/signup",
    cta: "Create GitHub account",
  },
  {
    step: "03",
    name: "Vercel",
    purpose: "Deploy your app from GitHub in a few clicks.",
    href: "https://vercel.com/signup",
    cta: "Create Vercel account",
  },
] as const;

export function WorkshopPage() {
  const reduceMotion = useReducedMotion();

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
      <div
        className="ambient-orb -left-24 top-16 h-72 w-72 opacity-80"
        aria-hidden
      />
      <div
        className="ambient-orb right-[-4rem] top-[28rem] h-80 w-80 opacity-70"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <div className="flex items-baseline gap-3">
          <p className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
            EPN Workshop
          </p>
          <span className="hidden text-sm text-muted sm:inline">Cursor × Next.js</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-6 pb-16 pt-6 sm:px-8 sm:pb-24">
          <motion.p
            className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent"
            {...fadeUp(0)}
          >
            Before we start
          </motion.p>
          <motion.h1
            className="max-w-3xl font-display text-[clamp(2.6rem,8vw,5.4rem)] leading-[0.95] tracking-[-0.04em] text-foreground"
            {...fadeUp(0.08)}
          >
            Workshop
            <br />
            setup guide
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            {...fadeUp(0.16)}
          >
            Create three accounts, then open the template repository. Bring these
            ready and you can build and deploy during the session.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-3" {...fadeUp(0.24)}>
            <a
              href="#accounts"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View requirements
            </a>
            <a
              href={TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open template repo
            </a>
          </motion.div>
        </section>

        <section id="accounts" className="scroll-mt-24 border-t border-border/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                Step one
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
                Accounts you need
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Sign up for each service before the workshop. Free plans are enough.
              </p>
            </div>

            <ol className="mt-14 divide-y divide-border border-y border-border">
              {accounts.map((account, index) => (
                <motion.li
                  key={account.name}
                  className="group grid gap-6 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-10 sm:py-10"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="font-mono text-sm text-muted">{account.step}</span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                      {account.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted">{account.purpose}</p>
                  </div>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors group-hover:border-accent group-hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:justify-self-end"
                  >
                    {account.cta}
                    <ExternalIcon className="ml-2" />
                  </a>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section id="template" className="scroll-mt-24 border-t border-border/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  Step two
                </p>
                <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
                  Workshop template
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Use this repository as your starting point. Fork it or open it in
                  Cursor when the session begins.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Repository
                </p>
                <p className="mt-4 break-all font-mono text-sm leading-relaxed text-foreground sm:text-base">
                  github.com/lmiguelvargasf/cursor_workshop
                </p>
                <a
                  href={TEMPLATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Open template on GitHub
                  <ExternalIcon className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                Checklist
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                You are ready when
              </h2>
            </div>
            <ul className="mt-10 max-w-2xl space-y-4 text-base text-muted sm:text-lg">
              <li className="flex gap-3">
                <CheckIcon />
                <span>You can sign in to Cursor, GitHub, and Vercel.</span>
              </li>
              <li className="flex gap-3">
                <CheckIcon />
                <span>You can open the workshop template repository.</span>
              </li>
              <li className="flex gap-3">
                <CheckIcon />
                <span>Your laptop is charged and ready for the session.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>EPN Workshop · Cursor instructions</p>
          <p>Deployed on Vercel</p>
        </div>
      </footer>
    </div>
  );
}

function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 17 17 7M10 7h7v7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12.5 10 17.5 19 7"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
