interface TagProps {
  name: string;
}

/* A small bordered label: skills, tech stack items and blog post tags. */
const Tag = ({ name }: TagProps) => {
  return <span className="tag inline-block">{name}</span>;
};

export default Tag;
