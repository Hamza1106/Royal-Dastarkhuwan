import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Specials } from "@/components/Specials";
import { Trending } from "@/components/Trending";
import { Featured } from "@/components/Featured";
import { Reviews } from "@/components/Reviews";
import { Branches } from "@/components/Branches";
import { Deals } from "@/components/Deals";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/use-document-head";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useDocumentHead(
    "Royal Dastarkhuwan — A living Pakistani restaurant universe",
    "Slow fire, cold light. Karahi, biryani, BBQ, sweets and cold-brew chai across 12 cities. An immersive tasting journey.",
  );

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Story />
      <Specials />
      <Trending />
      <Featured />
      <Deals />
      <Reviews />
      <Branches />
      <Gallery />
      <Footer />
    </div>
  );
}
