interface TagProps {
  name: string;
}

const TagElement = ({ name }: TagProps) => {
  return (
    <span className="text-xs font-medium tracking-widest uppercase text-gray-400 border border-r-4 border-b-4 p-1 rounded-lg dark:text-gray-500">
      {name}
    </span>
  );
};

export default TagElement;
