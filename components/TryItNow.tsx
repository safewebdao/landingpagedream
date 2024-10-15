"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import Image from 'next/image'

export default function TryItNow() {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [sliderValue, setSliderValue] = useState(50)
  const [isProcessing, setIsProcessing] = useState(false)
  const [renderedImage, setRenderedImage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    const formData = new FormData()
    if (url) {
      formData.append('url', url)
    } else if (file) {
      formData.append('image', file)
    }

    try {
      const response = await fetch('/api/render', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setRenderedImage(data.renderedUrl)
      } else {
        console.error('Rendering failed:', data.message)
      }
    } catch (error) {
      console.error('Error during rendering:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">历史成果展示</h2>
        <div className="relative w-full max-w-2xl aspect-video mx-auto mb-12">
          <Image
            src="/original-image.jpg"
            alt="原始设计"
            layout="fill"
            objectFit="cover"
          />
          <div
            className="absolute top-0 right-0 bottom-0 overflow-hidden"
            style={{ width: `${sliderValue}%` }}
          >
            <Image
              src="/rendered-image.jpg"
              alt="渲染后设计"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="w-1 bg-white h-full" style={{ left: `${sliderValue}%` }}></div>
          </div>
        </div>
        <Slider
          className="w-full max-w-2xl mx-auto mb-12"
          value={[sliderValue]}
          onValueChange={(value) => setSliderValue(value[0])}
          max={100}
          step={1}
        />
        <p className="text-sm text-gray-500 text-center mb-12">
          拖动滑块比较原始和渲染后的设计
        </p>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">立即尝试</h2>
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>渲染您的网站UI</CardTitle>
            <CardDescription>输入URL或上传截图以开始。</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="url" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">上传</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="url">网站URL</Label>
                      <Input 
                        id="url" 
                        placeholder="https://example.com" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="upload">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="screenshot">上传截图</Label>
                      <Input 
                        id="screenshot" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button">取消</Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? '处理中...' : '渲染UI'}
                </Button>
              </div>
            </form>
          </CardContent>
          {isProcessing && (
            <CardFooter>
              <p className="text-center w-full">处理中...</p>
            </CardFooter>
          )}
          {renderedImage && (
            <CardFooter className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">渲染结果</h3>
              <Image
                src={renderedImage}
                alt="渲染后的设计"
                width={500}
                height={300}
                objectFit="contain"
              />
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  )
}