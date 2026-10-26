import { ReactNode } from "react";

interface PageHeadProps {
  eyebrow: string;
  title: string;
  /** Right-aligned readout next to the title, e.g. "4 CARTRIDGES LOADED". */
  readout?: string;
  children?: ReactNode;
}

const PageHead = ({ eyebrow, title, readout, children }: PageHeadProps) => {
  return (
    <div className="mb-[30px] flex flex-col gap-1.5">
      <p className="eyebrow">{eyebrow}</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="h-page">{title}</h1>
        {readout && <span className="font-display text-[22px] text-phos-dim">{readout}</span>}
      </div>
      {children && <p className="mt-2.5 max-w-[62ch] text-phos-dim">{children}</p>}
    </div>
  );
};

export default PageHead;
