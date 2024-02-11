import { NextResponse } from 'next/server'
import * as fal from "@fal-ai/serverless-client"
import { getRandomPrompt } from './ideas'
import { URL } from '../../constants'

fal.config({
  credentials: process.env.FAL_KEY
})

const _html = (img, prompt) => {
  const link = `${URL}/image/?prompt=` + prompt + `&image=` + img
  return `
  <!DOCTYPE html>
  <html>
    <head>  
      <meta property="hey:portal:button:1" content="open in browser" />
      <meta property="hey:portal:button:1:action" content="link" />
      <meta property="hey:portal:button:1:target" content="${link}" />
  
      <meta propert="hey:portal" content="vNext" />
      <meta property="hey:portal:image" content="${img}" />
    </head>
  </html>
  `
}

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