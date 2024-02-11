export const runtime = 'edge'
import { URL as _URL } from '../constants'

const image = 'https://i.imgur.com/jkNjTAe.gif'

export default function Home() {
  return (
    <div>
      <a href="https://nader.codes" target="_blank" rel="no-opener">
      <img
        src={image}
        width={400}
        height={400}
        alt='Hello world.'
      />
      </a>
    </div>
  );
}

export async function generateMetadata() {
  const meta = {
    'og:image': image,
    'hey:portal': 'vNext',
    'hey:portal:image': image,
    'hey:portal:button:1': 'Generate my image',
    'hey:portal:button:1:type': 'submit',
    'hey:portal:button:1:target': `${_URL}/generate`,
  }

  return {
    metadataBase: new URL(_URL || ''),
    openGraph: {
      images: [
        {
          url: image,
          width: '1000',
          height: '1000'
        }
      ]
    },
    other: {
      ...meta
    },
  }
}
