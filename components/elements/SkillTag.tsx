interface SkillTagProps {
  name: string;
}

const SkillTag = ({ name }: SkillTagProps) => {
  return <span className="tag inline-block">{name}</span>;
};

export default SkillTag;
