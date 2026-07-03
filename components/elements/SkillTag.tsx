interface SkillTagProps {
  name: string;
}

const SkillTag = ({ name }: SkillTagProps) => {
  return (
    <span
      className="
        inline-flex items-center
        px-3.5 py-1
        rounded-full
        border border-neutral-900
        bg-transparent
        font-mono text-[13px] font-medium tracking-wide
        text-neutral-900
        whitespace-nowrap select-none cursor-default
        transition-colors duration-150 ease-in-out
        hover:bg-neutral-900 hover:text-white
        dark:border-neutral-100 dark:text-neutral-100
        dark:hover:bg-neutral-100 dark:hover:text-neutral-900
      "
    >
      {name}
    </span>
  );
};

export default SkillTag;
