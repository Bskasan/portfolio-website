import ProjectCard from "@/components/elements/ProjectCard";

import { ProjectMetaData } from "@/lib/types/project";

interface CartridgeBayProps {
  items: ProjectMetaData[];
  /** Letter before each slot number: P (projects), G (games), C (course games). */
  slotPrefix: string;
  onOpen: (item: ProjectMetaData) => void;
}

const CartridgeBay = ({ items, slotPrefix, onOpen }: CartridgeBayProps) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-[22px]">
      {items.map((item, index) => (
        <li key={item.id}>
          <ProjectCard
            project={item}
            slot={`${slotPrefix}${String(index + 1).padStart(2, "0")}`}
            onOpen={onOpen}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartridgeBay;
