import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import TryItNow from '@/components/TryItNow';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Features />
      <Testimonials />
      <TryItNow />
    </main>
  );
}