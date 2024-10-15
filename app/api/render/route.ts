import { NextResponse } from 'next/server'
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const formData = await request.formData()
  const url = formData.get('url') as string
  const image = formData.get('image') as File

  try {
    let input;
    if (url) {
      input = {
        prompt: `Render a modern UI design for the website: ${url}`,
        go_fast: true,
        guidance: 3.5,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: 28
      };
    } else if (image) {
      // 将图片转换为base64
      const arrayBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      input = {
        prompt: "Render a modern UI design based on this screenshot",
        image: `data:${image.type};base64,${base64Image}`,
        go_fast: true,
        guidance: 3.5,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: 28
      };
    } else {
      return NextResponse.json({ success: false, message: 'No URL or image provided' }, { status: 400 })
    }

    const output = await replicate.run("black-forest-labs/flux-dev", { input });
    
    return NextResponse.json({ 
      success: true, 
      message: 'UI rendered successfully',
      renderedUrl: output[0] // 假设输出是一个包含图片URL的数组
    })
  } catch (error) {
    console.error('Error during rendering:', error)
    return NextResponse.json({ success: false, message: 'Rendering failed' }, { status: 500 })
  }
}