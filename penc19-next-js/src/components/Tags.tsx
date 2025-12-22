interface TagsProps {
  tags: Tag[];
}

interface Tag {
  _key: string;
  label: string;
  name: string;
}

export default async function Tags({ tags }: TagsProps) {
  return (
    <span className="tags">
      {tags.map((tag: Tag) => (
        <span key={tag._key}>
          <span className="badge rounded-pill bg-light text-dark">
            {tag.label}
          </span>
          &nbsp;
        </span>
      ))}
    </span>
  );
}
