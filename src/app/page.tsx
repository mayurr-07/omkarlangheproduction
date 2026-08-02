import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/effects/Preloader";
import Cursor from "@/components/effects/Cursor";
import BackdropFX from "@/components/effects/BackdropFX";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import AboutSection from "@/components/sections/AboutSection";
import VideoSection from "@/components/sections/VideoSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <Cursor />
      <BackdropFX />
      <Navbar />
      <main id="top">
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <VideoSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
