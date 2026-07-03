export const ThumbnailPlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-xl dark:bg-surface-2 dark:border-line">
    <span className="text-2xl font-bold text-zinc-300 tracking-tight select-none dark:text-neutral-600">
      {name.charAt(0)}
    </span>
  </div>
);
