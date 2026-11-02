import { cn } from "@/lib/utils";

/** Label + control + hint + error wrapper. Pass the same `id` to the control inside. */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-magenta-ink" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="error-text" role="alert">{error}</p>}
    </div>
  );
}

/** Helper to spread aria attributes on a control. */
export const aria = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function FormSuccess({ title, children, icon }: { title: string; children?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="card relative overflow-hidden p-8 md:p-10" role="status" aria-live="polite">
      <div className="absolute -right-6 -top-6 size-28 rounded-full bg-tangerine border-[3px] border-plum" aria-hidden="true" />
      <div className="relative">
        {icon}
        <h3 className="headline text-3xl md:text-4xl mt-2">{title}</h3>
        <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
