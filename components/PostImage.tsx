import Image from "next/image";

async function PostImage({
  imageFilename,
  imageFilePath,
  alt,
}: {
  imageFilename: string;
  alt: string;
  imageFilePath: string;
}) {
  const { default: image } = await import(
    `../public/images/${imageFilePath ? imageFilePath + "/" : ""}${imageFilename}`
  );

  // image contains width, height, and blurDataURL
  return (
    <figure className="my-2">
      <div className="tint decode aspect-video max-w-full border border-phos-faint" tabIndex={0}>
        <Image src={image} alt={alt} loading="eager" placeholder="blur" />
      </div>
      <figcaption className="mt-1.5 font-display text-lg tracking-[0.08em] text-phos-dim">
        FIG. {imageFilename.replace(/\.[a-z]+$/i, "").toUpperCase()}
      </figcaption>
    </figure>
  );
}

export default PostImage;
