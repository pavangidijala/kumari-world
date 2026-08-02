import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ExamsGrid } from "@/components/landing/exams-grid";
import { Features } from "@/components/landing/features";
import { Cta, Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExamsGrid />
        <Features />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
