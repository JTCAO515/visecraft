import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const className =
    variant === "primary"
      ? "marketing-action marketing-action-primary"
      : variant === "secondary"
        ? "marketing-action marketing-action-secondary"
        : "marketing-action marketing-action-text";
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={16} />
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} onClick={onClick} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick}>
      {content}
    </Link>
  );
}

export function SectionIntro({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-intro">
      <span className="mono-label text-[var(--jade)]">{number}</span>
      <div>
        <h2 className="section-title">{title}</h2>
        {body ? <p className="section-copy">{body}</p> : null}
      </div>
    </div>
  );
}

export function PricingCard({
  plan,
  includedLabel,
  onClick,
}: {
  plan: {
    name: string;
    badge: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    href: string;
    featured: boolean;
  };
  includedLabel: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <article className={`pricing-card${plan.featured ? " pricing-card-featured" : ""}`}>
      <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <h3 className="text-2xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-sm text-[var(--text-dim)]">{plan.badge}</p>
        </div>
        {plan.featured ? <span className="status-line status-line-jade" aria-hidden="true" /> : null}
      </div>
      <p className="mt-7 text-3xl font-semibold tracking-[-0.03em]">{plan.price}</p>
      <p className="mt-4 min-h-12 text-sm leading-6 text-[var(--text-dim)]">{plan.description}</p>
      <div className="mt-7 border-t border-[var(--line)] pt-5">
        <p className="mono-label text-[var(--text-faint)]">{includedLabel}</p>
        <ul className="mt-4 grid gap-3">
          {plan.features.map((feature) => (
            <li className="flex items-start gap-3 text-sm text-[var(--text-dim)]" key={feature}>
              <Check aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--jade)]" size={15} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-8">
        <ActionLink href={plan.href} onClick={onClick} variant={plan.featured ? "primary" : "secondary"}>
          {plan.cta}
        </ActionLink>
      </div>
    </article>
  );
}

export function FaqList({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="border-t border-[var(--line-hi)]">
      {items.map((item) => (
        <details className="faq-row group" key={item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium marker:content-none">
            <span>{item.question}</span>
            <Plus
              aria-hidden="true"
              className="shrink-0 text-[var(--text-faint)] transition-transform group-open:rotate-45 group-open:text-[var(--jade)]"
              size={18}
            />
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-[var(--text-dim)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function MarketingCta({
  title,
  body,
  primary,
  secondary,
  onPrimaryClick,
  onSecondaryClick,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; external?: boolean };
  onPrimaryClick?: MouseEventHandler<HTMLAnchorElement>;
  onSecondaryClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <section className="content-rail py-20 md:py-28">
      <div className="marketing-cta">
        <div>
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-dim)]">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ActionLink href={primary.href} onClick={onPrimaryClick}>
            {primary.label}
          </ActionLink>
          <ActionLink
            external={secondary.external}
            href={secondary.href}
            onClick={onSecondaryClick}
            variant="secondary"
          >
            {secondary.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
