interface TagProps {
  key: string;
  name: string;
}

const Tag = ({ key, name }: TagProps) => {
  return (
    <span
      key={key}
      className="text-xs font-medium tracking-widest uppercase text-gray-400 border border-r-4 border-b-4 p-1 rounded-lg"
    >
      {name}
    </span>
  );
};

export default Tag;
