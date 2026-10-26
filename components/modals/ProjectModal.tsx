"use client"; // Next.js App Router: this component is interactive (refs, effects)

import "./ProjectModal.css";
import Image from "next/image";

import { useEffect, useRef } from "react";
import { ProjectMetaData } from "@/lib/types/project";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { DEFAULT_STATUS_STYLE, STATUS_STYLES } from "@/constants/styles";

interface ProjectModalProps {
  project: ProjectMetaData | null;
  open: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden"; // lock background scroll
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.body.style.overflow = ""; // restore scroll
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  /*
    Backdrop click → close. The ::backdrop is part of the <dialog>, so clicking
    it reports e.target === the dialog element. The dialog has NO padding (all
    padding lives on the inner panel), so "target is the dialog" reliably means
    "clicked outside the panel".
  */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (!project) return null;

  const titleId = `project-modal-title-${project.id}`;
  const descId = `project-modal-desc-${project.id}`;
  const statusClass = STATUS_STYLES[project.status.key.toLowerCase()] ?? DEFAULT_STATUS_STYLE;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="project-modal m-auto max-h-[88vh] w-[min(92vw,40rem)] p-0"
    >
      {/* Inner panel owns ALL padding so the dialog edge === backdrop. */}
      <div className="flex flex-col">
        <div className="hbar sticky top-0 z-10 flex items-center justify-between gap-2.5 py-0.5 pr-1 pl-3 font-display text-[21px] tracking-[0.06em]">
          <span className="truncate">LOAD://{project.id}.cart</span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close dialog"
            className="bg-glass px-2.5 font-display text-[21px] text-phos hover:bg-phos-faint"
          >
            [ X ]
          </button>
        </div>

        {project.thumbnail && (
          <div className="tint is-decoded aspect-video max-w-full border-b border-phos-faint">
            <Image
              src={project.thumbnail}
              alt={`Screenshot of ${project.name}`}
              width={640}
              height={360}
            />
          </div>
        )}

        <div className="flex flex-col gap-3.5 px-5 pt-[18px] pb-[22px]">
          <h2 id={titleId} className="text-[40px] uppercase">
            {project.name}
          </h2>

          <dl className="grid grid-cols-[90px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[13px] min-[760px]:grid-cols-[110px_minmax(0,1fr)]">
            <dt className="font-display text-[19px] leading-[1.2] tracking-[0.08em] text-phos-dim">
              STATUS
            </dt>
            <dd>
              <span className={statusClass}>{project.status.value}</span>
            </dd>
            <dt className="font-display text-[19px] leading-[1.2] tracking-[0.08em] text-phos-dim">
              YEAR
            </dt>
            <dd>{project.year ?? "—"}</dd>
            {project.techStack.length > 0 && (
              <>
                <dt className="font-display text-[19px] leading-[1.2] tracking-[0.08em] text-phos-dim">
                  STACK
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {project.techStack.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            )}
          </dl>

          <p id={descId} className="text-sm">
            {project.description}
          </p>

          <div className="mt-1 flex flex-wrap gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer" // prevents reverse tabnabbing
                className="cmdlink is-solid"
              >
                [ VISIT PROJECT <ExternalLinkIcon /> ]
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cmdlink"
              >
                [ VIEW CODE <ExternalLinkIcon /> ]
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProjectModal;
