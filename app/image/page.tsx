export default function Page({ searchParams }) { 
  const image = searchParams.image
  const prompt = searchParams.prompt
 
  return (
    <div
      className="
      p-6
      md:p-20"
    >
      <p className='mb-4'>{prompt}</p>
      <a href={image || ''} target="_blank" rel="no-opener">
        <img
          src={image || ""}
          width={600}
          height={600}
          className='rounded-lg'
          alt={prompt || ""}
        />
      </a>
    </div>
  );
}

