import Image from "next/image";

import { ProjectMetaData } from "@/lib/types/project";
import { ThumbnailPlaceholder } from "@/components/elements/ThumbnailPlaceholder";
import { DEFAULT_STATUS_STYLE, STATUS_STYLES } from "@/constants/styles";

interface ProjectCardProps {
  project: ProjectMetaData;
  /** Slot label shown on the card, e.g. "P01". */
  slot: string;
  onOpen: (project: ProjectMetaData) => void;
}

/*
  A project or game shown as a "cartridge". The image is tinted in the phosphor
  colour and decodes to full colour on hover / focus. The card shows the logo when
  there is one; the project window keeps showing the thumbnail.
*/
const ProjectCard = ({ project, slot, onOpen }: ProjectCardProps) => {
  const cardImage = project.logo ?? project.thumbnail;
  const statusClass = STATUS_STYLES[project.status.key.toLowerCase()] ?? DEFAULT_STATUS_STYLE;
  const shownTech = project.techStack.slice(0, 3).join(" · ");
  const moreTech = project.techStack.length - 3;

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="decode group flex h-full w-full flex-col border border-phos-faint text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-phos focus-visible:border-phos"
    >
      <span className="flex items-center justify-between border-b border-phos-faint px-2.5 py-[3px] font-display text-lg tracking-[0.1em] text-phos-dim group-hover:bg-phos group-hover:text-glass group-hover:[text-shadow:none]">
        <span>SLOT {slot}</span>
        <span>{project.year ?? "----"}</span>
      </span>

      <span className="tint block aspect-[4/3] w-full max-w-full">
        {cardImage ? (
          <Image
            src={cardImage}
            alt=""
            width={480}
            height={360}
            loading="eager"
            // Cards fill the column (minus the 16px gutters) on phones, ~250-320px in the grid.
            sizes="(max-width: 759px) calc(100vw - 32px), 320px"
            // Centre-anchored cover: the card images are square logos in a 4:3 box, so
            // cover has to crop; centring splits that crop evenly top and bottom
            // instead of cutting it all from the bottom (which pushed logos low).
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <ThumbnailPlaceholder name={project.name} />
        )}
      </span>

      <span className="flex flex-1 flex-col gap-2 border-t border-phos-faint px-3 pt-3 pb-3.5">
        <span className="font-display text-card leading-none uppercase">{project.name}</span>
        <span className="flex flex-wrap items-center gap-2.5 text-xs text-phos-dim">
          <span className={statusClass}>{project.status.value}</span>
          <span>
            {shownTech}
            {moreTech > 0 && ` +${moreTech}`}
          </span>
        </span>
        <span className="mt-auto font-display text-label tracking-[0.08em] text-phos-dim group-hover:text-phos">
          &gt; LOAD CARTRIDGE
        </span>
      </span>
    </button>
  );
};

export default ProjectCard;
