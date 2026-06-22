export const ThumbnailPlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-xl">
    <span className="text-2xl font-bold text-zinc-300 tracking-tight select-none">
      {name.charAt(0)}
    </span>
  </div>
);
