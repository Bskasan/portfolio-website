interface TagProps {
  name: string;
}

const TagElement = ({ name }: TagProps) => {
  return <span className="tag inline-block">{name}</span>;
};

export default TagElement;
