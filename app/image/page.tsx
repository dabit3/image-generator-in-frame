'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
 
  const image = searchParams.get('image')
  const prompt = searchParams.get('prompt')
 
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