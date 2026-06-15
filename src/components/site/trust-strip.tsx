export function TrustStrip({ approvals }: { approvals?: string[] }) {
  if (!approvals || approvals.length === 0) return null;

  return (
    <div className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 sm:gap-x-12 sm:px-8">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Backed by verified approvals
        </span>
        <span className="hidden h-4 w-px bg-border sm:block" />
        {approvals.map((a) => (
          <span
            key={a}
            className="text-sm font-medium tracking-wide text-forest/80"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
