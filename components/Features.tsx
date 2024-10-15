import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Zap, Eye } from "lucide-react"

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Wand2 className="h-10 w-10 mb-2" />
              <CardTitle>AI-Powered Rendering</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our advanced AI analyzes your website and generates a modern, attractive UI.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get your new UI design in seconds, not hours or days.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Eye className="h-10 w-10 mb-2" />
              <CardTitle>See the Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Compare your original design with the AI-rendered version side by side.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}