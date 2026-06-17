"use client"; // Next.js App Router: this component is interactive (refs, effects)

import { useEffect, useRef } from "react";
import "./ProjectModal.css";
import { ProjectMetaData } from "@/lib/types/project";
import { CloseIcon } from "../icons/CloseIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { STATUS_STYLES } from "@/constants/styles";
import Image from "next/image";

interface ProjectModalProps {
  project: ProjectMetaData | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
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
  const statusClass = STATUS_STYLES[project.status.toLowerCase()] ?? "bg-slate-100 text-slate-600";

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="project-modal m-auto w-[min(90vw,32rem)] rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl"
    >
      {/* Inner panel owns ALL padding so the dialog edge === backdrop. */}
      <div className="flex flex-col">
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={`Screenshot of ${project.name}`}
            className="h-72 w-full rounded-t-2xl object-cover"
          />
        )}

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                {project.name}
              </h2>

              {/* Meta row: status badge + year */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className={`rounded-full px-2 py-0.5 font-medium ${statusClass}`}>
                  {project.status}
                </span>
                <span aria-hidden="true">&bull;</span>
                <span>{project.year}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close dialog"
              className="-mr-1 -mt-1 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          <p id={descId} className="text-sm leading-relaxed text-slate-600">
            {project.description}
          </p>

          {project.techStack.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {project.techStack.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 flex flex-wrap gap-3">
            {/* liveUrl is a required string, so this always renders. */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer" // prevents reverse tabnabbing
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Visit project
              <ExternalLinkIcon />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                View code
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
