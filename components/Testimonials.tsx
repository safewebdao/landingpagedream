import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Alex Johnson",
              role: "Web Developer",
              content: "This AI tool saved me hours of design work. The results were impressive and my clients love it!",
              avatar: "AJ"
            },
            {
              name: "Sarah Lee",
              role: "UX Designer",
              content: "I was skeptical at first, but the AI-generated designs gave me great inspiration for my projects.",
              avatar: "SL"
            },
            {
              name: "Mike Chen",
              role: "Startup Founder",
              content: "We used this for our MVP and it helped us launch faster. Highly recommended for quick iterations.",
              avatar: "MC"
            }
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name}`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}