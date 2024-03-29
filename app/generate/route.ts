import { NextResponse } from 'next/server'
import * as fal from "@fal-ai/serverless-client"
import { getRandomPrompt } from './ideas'
import { URL } from '../../constants'

fal.config({
  credentials: process.env.FAL_KEY
})

export async function POST(req) {  
  try {
    const data = await req.json()
    const { untrustedData } = data
    const { inputText } = untrustedData
    let prompt = inputText
    let image = ''

    if (!inputText) {
      prompt = getRandomPrompt()
    }
    const result:any = await fal.subscribe("fal-ai/lcm", {
      input: {
        prompt,
        image_size: 'square_hd'
      }
    })
    if (result.images[0]) {
      image = result.images[0].url
    }
    
    return new NextResponse(_html(image, prompt))
  } catch (err) {
    console.log('error:', err)
  }
}

function _html(img, prompt) {
  const link = `${URL}/image/?prompt=` + prompt + `&image=` + img
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Frame</title>
      <mega property="og:image" content="${img}" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${img}" />
      <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  
      <meta property="fc:frame:button:1" content="open in browser" />
      <meta property="fc:frame:button:1:action" content="link" />
      <meta property="fc:frame:button:1:target" content="${link}" />
  
      <meta propert="hey:portal" content="vNext" />
      <meta property="hey:portal:image" content="${img}" />
      <meta property="og:image" content="${img}" />
      <meta property="hey:portal" content="vLatest" />
      <meta property="hey:portal:button:1" content="open in browser" />
      <meta property="hey:portal:button:1:type" content="link" />
      <meta property="hey:portal:button:1:target" content="${link}" />
      <meta property="hey:portal:image" content="${img}" />
    </head>
  </html>
  `
}