import { CheckIcon, ExternalIcon } from "@/components/icons";
import { TEMPLATE_URL } from "@/components/workshop-data";

export function TemplateSection() {
  return (
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
              Use this repository as your starting point. Fork it or open it in Cursor
              when the session begins.
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
  );
}

export function ChecklistSection() {
  return (
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
  );
}
