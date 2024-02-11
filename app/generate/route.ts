import { NextResponse } from 'next/server'
import * as fal from "@fal-ai/serverless-client"
import { getRandomPrompt } from './ideas'

fal.config({
  credentials: process.env.FAL_KEY
})

const _html = (img) => `
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
    <meta property="fc:frame:button:1:target" content="${img}" />

    <meta propert="hey:portal" content="vNext" />
    <meta property="hey:portal:image" content="${img}" />
  </head>
</html>
`

export async function POST(req) {  
  try {
    const data = await req.json()
    const { untrustedData } = data
    const { inputText, fid } = untrustedData
    let prompt = inputText
    let image = ''

    if (!inputText) {
      prompt = getRandomPrompt()
    }
    const result:any = await fal.subscribe("fal-ai/fast-sdxl", {
      input: {
        prompt,
        size: 'square_hd'
      }
    })
    if (result.images[0]) {
      image = result.images[0].url
    }
    
    return new NextResponse(_html(image))
  } catch (err) {
    console.log('error:', err)
  }
}