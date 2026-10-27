interface EmptyStateProps {
  /** Short uppercase headline, e.g. "NO POSTS YET." */
  title: string;
  hint?: string;
}

/* Shown when a list (projects, games, posts) has nothing in it. */
const EmptyState = ({ title, hint = "Check back soon." }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-phos-dim">
      <p className="font-display text-2xl">{title}</p>
      <p className="text-sm">{hint}</p>
    </div>
  );
};

export default EmptyState;
