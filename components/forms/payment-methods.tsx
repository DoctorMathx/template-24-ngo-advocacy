"use client";

import { Building2, CreditCard, Lock, Smartphone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, formatNaira } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { Field, aria } from "./field";

export type PayMethod = "card" | "transfer" | "ussd";
export type CardDetails = { name: string; number: string; expiry: string; cvc: string };
export const emptyCard: CardDetails = { name: "", number: "", expiry: "", cvc: "" };

export const payMethodLabel: Record<PayMethod, string> = { card: "Card", transfer: "Bank transfer", ussd: "USSD" };

/** Validation for the simulated card form. Returns field → message. */
export function validateCard(c: CardDetails) {
  const e: Partial<Record<keyof CardDetails, string>> = {};
  const digits = c.number.replace(/\s/g, "");
  if (!c.name.trim()) e.name = "Enter the name on the card.";
  if (!/^\d{16,19}$/.test(digits)) e.number = "Card number should be 16–19 digits.";
  const m = c.expiry.match(/^(\d{2})\s?\/\s?(\d{2})$/);
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = "Use MM/YY.";
  if (!/^\d{3,4}$/.test(c.cvc)) e.cvc = "3 or 4 digits.";
  return e;
}

const formatCardNumber = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export function PaymentMethods({
  method,
  onMethod,
  card,
  onCard,
  errors,
  reference,
  amount,
  idPrefix = "pay",
}: {
  method: PayMethod;
  onMethod: (m: PayMethod) => void;
  card: CardDetails;
  onCard: (c: CardDetails) => void;
  errors: Partial<Record<keyof CardDetails, string>>;
  reference: string;
  amount: number;
  idPrefix?: string;
}) {
  const { bank, ussd } = siteConfig.donation;
  const tabs: { id: PayMethod; label: string; icon: React.ReactNode }[] = [
    { id: "card", label: "Card", icon: <CreditCard className="size-4" /> },
    { id: "transfer", label: "Bank transfer", icon: <Building2 className="size-4" /> },
    { id: "ussd", label: "USSD", icon: <Smartphone className="size-4" /> },
  ];
  const ussdWithAmount = ussd.code;

  return (
    <div>
      <div role="tablist" aria-label="Payment method" className="grid grid-cols-3 gap-2 rounded-full border-[3px] border-plum bg-paper p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={method === t.id}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            onClick={() => onMethod(t.id)}
            className={cn(
              "flex min-h-[46px] items-center justify-center gap-1.5 rounded-full px-2 text-sm font-bold transition-colors sm:text-[0.95rem]",
              method === t.id ? "bg-plum text-cream" : "hover:bg-blush"
            )}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5" role="tabpanel" id={`${idPrefix}-panel-${method}`} aria-labelledby={`${idPrefix}-tab-${method}`}>
        {method === "card" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id={`${idPrefix}-cname`} label="Name on card" error={errors.name} required className="sm:col-span-2">
              <input {...aria(`${idPrefix}-cname`, errors.name)} className="input" autoComplete="cc-name" value={card.name} onChange={(e) => onCard({ ...card, name: e.target.value })} />
            </Field>
            <Field id={`${idPrefix}-cnum`} label="Card number" error={errors.number} required className="sm:col-span-2">
              <input {...aria(`${idPrefix}-cnum`, errors.number)} className="input tabular-nums" inputMode="numeric" autoComplete="cc-number" placeholder="5399 2312 3456 7890" value={card.number} onChange={(e) => onCard({ ...card, number: formatCardNumber(e.target.value) })} />
            </Field>
            <Field id={`${idPrefix}-cexp`} label="Expiry" error={errors.expiry} required>
              <input {...aria(`${idPrefix}-cexp`, errors.expiry)} className="input tabular-nums" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={card.expiry} onChange={(e) => onCard({ ...card, expiry: formatExpiry(e.target.value) })} />
            </Field>
            <Field id={`${idPrefix}-ccvc`} label="CVC" error={errors.cvc} required>
              <input {...aria(`${idPrefix}-ccvc`, errors.cvc)} className="input tabular-nums" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={card.cvc} onChange={(e) => onCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
            </Field>
            <p className="sm:col-span-2 flex items-center gap-2 text-sm opacity-80">
              <Lock className="size-4" /> Demo checkout — no card is charged. Connect Paystack or Flutterwave in production.
            </p>
          </div>
        )}

        {method === "transfer" && (
          <div className="rounded-[18px] border-[3px] border-plum bg-plum p-5 text-cream on-dark md:p-6">
            <p className="text-sm opacity-85">Transfer {amount > 0 ? <strong className="text-tangerine">{formatNaira(amount)}</strong> : "your gift"} to:</p>
            <dl className="mt-4 grid gap-3 text-[0.98rem]">
              <Row label="Bank" value={bank.bankName} />
              <Row label="Account name" value={bank.accountName} />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream/20 pt-3">
                <div>
                  <dt className="text-xs uppercase tracking-widest opacity-70">Account number</dt>
                  <dd className="font-display text-2xl font-extrabold tracking-wider">{bank.accountNumber}</dd>
                </div>
                <CopyButton value={bank.accountNumber.replace(/\s/g, "")} label="Copy number" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream/20 pt-3">
                <div>
                  <dt className="text-xs uppercase tracking-widest opacity-70">Use this reference</dt>
                  <dd className="font-display text-xl font-extrabold text-tangerine">{reference}</dd>
                </div>
                <CopyButton value={reference} label="Copy reference" />
              </div>
            </dl>
            <p className="mt-4 text-sm opacity-80">Include the reference so we can match your gift and email your receipt. Transfers usually reflect within minutes.</p>
          </div>
        )}

        {method === "ussd" && (
          <div className="rounded-[18px] border-[3px] border-plum bg-tangerine-soft p-5 md:p-6">
            <p className="text-sm">Dial on your phone{amount > 0 ? <> to give <strong>{formatNaira(amount)}</strong></> : null}:</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-[2.5px] border-plum bg-paper p-4">
              <code className="font-display text-xl font-extrabold tracking-wide md:text-2xl">{ussdWithAmount}</code>
              <CopyButton value={ussdWithAmount} label="Copy code" />
            </div>
            <p className="mt-3 text-sm">{ussd.note}</p>
            <ul className="mt-3 grid gap-1.5 text-sm">
              {ussd.banks.map((b) => (
                <li key={b.bank} className="flex justify-between gap-3 border-b border-plum/15 pb-1.5">
                  <span className="font-semibold">{b.bank}</span>
                  <code>{b.code.replace("AMOUNT", amount > 0 ? String(amount) : "AMOUNT")}</code>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">Reference: <strong>{reference}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="opacity-75">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}
