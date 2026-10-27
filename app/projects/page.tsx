"use client";

import PageWrapper from "@/components/animated/PageWrapper";
import EmptyState from "@/components/elements/EmptyState";
import ProjectModal from "@/components/modals/ProjectModal";
import PageHead from "@/components/pages/PageHead";
import CartridgeBay from "@/components/pages/CartridgeBay";

import { ProjectMetaData } from "@/lib/types/project";
import { PROJECTS } from "@/constants/projects";
import { useCartridgeSelection } from "@/hooks/useCartridgeSelection";

const projects: ProjectMetaData[] = PROJECTS;

const ProjectsPage = () => {
  const { selected, open, close } = useCartridgeSelection(projects);

  return (
    <PageWrapper>
      <PageHead
        eyebrow="Cartridge bay"
        title="Projects"
        readout={`${projects.length} CARTRIDGES LOADED`}
      >
        Things I&apos;ve built — side projects, tools, and experiments. You can check my GitHub page
        to see more about my projects.
      </PageHead>

      {projects.length > 0 ? (
        <CartridgeBay items={projects} slotPrefix="P" onOpen={open} />
      ) : (
        <EmptyState title="NO CARTRIDGES FOUND." />
      )}

      <ProjectModal project={selected} open={selected !== null} onClose={close} />
    </PageWrapper>
  );
};

export default ProjectsPage;
