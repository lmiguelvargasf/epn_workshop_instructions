"use client";

import { motion } from "framer-motion";
import { ExternalIcon } from "@/components/icons";
import { accounts } from "@/components/workshop-data";

export function AccountsSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section id="accounts" className="scroll-mt-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Step two
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
            Accounts you need
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            After installing Cursor, sign up for each service. Free plans are
            enough.
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
  );
}
