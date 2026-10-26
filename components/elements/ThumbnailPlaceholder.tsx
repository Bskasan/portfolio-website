export const ThumbnailPlaceholder = ({ name }: { name: string }) => (
  <span className="flex h-full w-full items-center justify-center bg-glass-2">
    <span className="font-display text-6xl text-phos-dim select-none">{name.charAt(0)}</span>
  </span>
);
