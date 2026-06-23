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
  return <Image src={image} alt={alt} className="my-4 rounded-3xl" loading="eager" />;
}

export default PostImage;
