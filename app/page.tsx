// src/app/page.tsx
import { Navbar } from '@/app/components/new/Navbar';
import { Hero } from '@/app/components/new/Hero';
import { QuickButtons } from '@/app/components/new/QuickButtons';
import { EarlyAccess } from '@/app/components/new/EarlyAccess';
import { Footer } from '@/app/components/new/Footer';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center font-sans antialiased">
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col justify-between relative overflow-hidden min-h-screen md:min-h-[850px] md:my-6 md:rounded-3xl border border-gray-100">
        
        <Navbar />

        <main className="flex-1 px-6 flex flex-col justify-center gap-8 py-4">
          <Hero />
          <QuickButtons />
          <EarlyAccess />
        </main>

        <Footer />
        
      </div>
    </div>
  );
}