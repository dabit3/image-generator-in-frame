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
    'fc:frame': 'vNext',

    'fc:frame:image': image,
    'fc:frame:image:aspect_ratio': '1:1',
  
    'fc:frame:post_url': `${_URL}/generate`,
    'fc:frame:button:1': "Create your idea",
    'fc:frame:button:1:action': 'post',

    'fc:frame:button:2': "Generate image from random idea",
    'fc:frame:button:2:action': 'post',
    'fc:frame:button:2:target': `${_URL}/generate`,

    'fc:frame:input:text': "what's your idea?",

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